"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  // TODO: validar o nome para ser único
  name: z
    .string()
    .min(1, "O campo nome é obrigatório.")
    .refine(
      (value) =>
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(value) && 
        /^[^\d@#$%]+$/.test(value), 
      {
        message:
          "O nome não pode começar com número ou conter caracteres especiais.",
      }
    )
    .transform(value => value.trim()),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Digite um e-mail válido.")
    .transform(value => value.trim()),
  phone: z.string().refine(
    (value) => {
      return (
        (/^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
          /^\d{2}\s\d{9}$/.test(value) ||
          /^\d{11}$/.test(value)) &&
        value.length <= 11
      );
    },
    {
      message: "O número de telefone deve estar (DD) 999999999",
    }
  )
  .transform(value => value.trim()),
  address: z.string().transform(value => value.trim()),
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
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId
    });

    // TODO: utilizar o Toast para notificação
    router.refresh();

    router.replace("/dashboard/customer");
  };

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
      noValidate
    >
      <label className="mb-1 text-lg font-medium text-white">
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
          <label className="mb-1 text-lg font-medium text-white">
            Telefone
          </label>

          <Input
            type="text"
            name="phone"
            placeholder="Exemplo (DD) 999999999"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium text-white">E-mail</label>

          <Input
            type="email"
            name="email"
            placeholder="Informe seu e-mail..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium text-white">
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
