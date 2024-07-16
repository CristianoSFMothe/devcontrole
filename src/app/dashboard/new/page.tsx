import { Container } from "@/components/container";
import CustomLinkButton from "@/components/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { toast } from 'react-toastify';

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const handleRegisterTicket = async (formData: FormData) => {
    "use server"

    const name = formData.get("name")
    const description = formData.get("description")
    const customerId = formData.get("customer")

    if(!name || !description || !customerId) {
      return;
      // TODO: Usar o Toast para mensagem
    }

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id
      }
    })

    console.log("CHAMADA CRIADO COM SUCESSO!")
    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <CustomLinkButton href="/dashboard" className="btn-back">
            Voltar
          </CustomLinkButton>
          <h2 className="text-3xl font-bold text-white">Novo chamado</h2>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket} noValidate>
          <label className="mb-1 font-medium text-lg text-gray-300">
            Nome do chamado
          </label>
          <input
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            type="text"
            name="name"
            placeholder="Digite o nome do chamado..."
            required
          />
          <label className="mb-1 font-medium text-lg text-gray-300">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-28 resize-none"
            name="description"
            placeholder="Descreva o problema..."
            required
          ></textarea>

          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg text-gray-300">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                name="customer"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione um cliente
                </option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <h2 className="text-base font-light text-gray-300 mt-1">
              <span className="mr-4">
                Você ainda não possui clientes cadastrados.
              </span>
              <CustomLinkButton
                href="/dashboard/customer/new"
                className="btn-add-customer mt-4 font-bold"
              >
                Cadastrar Cliente
              </CustomLinkButton>
            </h2>
          )}

          <button
            type="submit"
            className="
              bg-blue-500 text-white font-bold 
              px-2 h-11 rounded-md my-4 hover:opacity-75 
              disabled:bg-gray-400 disabled:cursor-not-allowed
              disabled:hover:opacity-100"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
