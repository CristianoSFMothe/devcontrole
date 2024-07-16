"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = z.object({
  name: z
    .string()
    .min(1, "O campo nome é obrigatório.")
    .transform((value) => value.trim()),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Digite um e-mail válido.")
    .transform((value) => value.trim()),
  phone: z
    .string()
    .refine((value) => {
      return /^[0-9\s]+$/.test(value);
    }, "O número de telefone não pode conter letras.")
    .refine((value) => {
      const trimmedValue = value.trim();
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(trimmedValue) ||
        /^\d{2}\s\d{9}$/.test(trimmedValue) ||
        /^\d{11}$/.test(trimmedValue) 
      );
    }, "O número de telefone deve estar no formato (DD) 999999999, DD 999999999 ou 999999999."),
  address: z.string().transform((value) => value.trim()),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const handleRegisterCustomer = async (data: FormData) => {
    try {
      await api.post("/api/customer", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        userId: userId,
      });

      toast.success("Cliente criado com sucesso!");
      router.replace("/dashboard/customer");
      router.refresh();
    } catch (error) {
      toast.error("Já existe um cliente cadastro com o nome informado.");
    }
  };

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
      noValidate
    >
      <label className="mb-1 text-lg font-medium  text-gray-300">
        Nome Completo
      </label>

      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo..."
        error={errors.name?.message}
        register={register}
      />

      <section className="flex gap-2 mt-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium  text-gray-300">
            Telefone
          </label>

          <Input
            type="text"
            name="phone"
            placeholder="Exemplo DD 999999999"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium  text-gray-300">
            E-mail
          </label>

          <Input
            type="email"
            name="email"
            placeholder="Informe seu e-mail..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium  text-gray-300">
        Endereço completo
      </label>

      <Input
        type="text"
        name="address"
        placeholder="Informe o endereço cliente..."
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="btn-register 
          bg-blue-500 my-4 px-2 h-11 
          rounded text-white 
          font-bold flex 
          items-center 
          justify-center 
          text-2xl hover:opacity-75"
      >
        Cadastrar
      </button>
    </form>
  );
}
