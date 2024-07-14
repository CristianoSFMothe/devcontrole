"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { FormTicket } from "./components/FormTicket";

const schema = z.object({
  email: z
    .string()
    .email("Digite o e-mail do cliente para localizar")
    .min(1, "O campo e-mail é obrigatório")
    .transform((value) => value.trim()),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleClearCustomer = () => {
    setCustomer(null);
    setValue("email", "");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24 text-gray-300">
        Abrir chamado
      </h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
            <p className="customer-name text-lg">
              <strong>Cliente selecionado:</strong> {customer.name}
            </p>
            <button
              className="h-11 px-2 flex items-center justify-center btn-clear rounded"
              onClick={handleClearCustomer}
            >
              <FiX size={30} color="#FF2929" />
            </button>
          </div>
        ) : (
          <form className="bg-slate-200 py-6 px-2 rounded border-2">
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o e-mail"
                type="email"
                error={errors.email?.message}
                register={register}
              />

              <button
                className="bg-blue-500 
                flex flex-row gap-3 
                px-2 h-11 items-center 
                justify-center text-white 
                font-bold btn-search rounded"
              >
                Procurar cliente...
                <FiSearch size={24} color="#FFF" />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket />}
      </main>
    </div>
  );
}
