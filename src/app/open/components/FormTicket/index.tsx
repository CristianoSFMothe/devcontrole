"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";
import { toast } from 'react-toastify';

const schema = z.object({
  name: z.string().min(1, "O campo nome do chamado é obrigatório"),
  description: z.string().min(1, "Descreva sobre o seu problema..."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo
}

export function FormTicket({ customer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleRegisterTicket = async (data: FormData) => {
    try {
      const response = await api.post("/api/ticket", {
        name: data.name,
        description: data.description,
        customerId: customer.id
      });
  
      toast.success("Chamada registrada com sucesso!");
      setValue("name", "");
      setValue("description", "");
    } catch (error) {
      toast.error("Erro ao registrar chamada. Tente novamente.");
    }
  };

  return (
    <form
      className="bg-slate-200 mt-6 px-4 py-6 rounded"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="mb-1 font-medium text-lg">Nome do chamado</label>
      <Input
        register={register}
        type="text"
        placeholder="Digite o nome do chamado..."
        name="name"
        error={errors.name?.message}
      />

      <label className="mb-1 font-medium text-lg">Descreva o problema</label>
      <textarea
        className="w-full border-2 rounded-md h-28 resize-none px-2 description"
        placeholder="Descreva sobre o seu problema..."
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 my-1">{errors.description.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-2 w-full h-11 mt-1 mb-4 
          rounded-md font-bold btn-register hover:opacity-85 duration-300"
      >
        Cadastrar
      </button>
    </form>
  );
}
