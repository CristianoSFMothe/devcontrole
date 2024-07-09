import { Container } from "@/components/container";
import CustomLinkButton from "@/components/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardCustomer from "./components/card";
import prismaClient from "@/lib/prisma";

const Customer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="text-white flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus Clientes</h1>
          <CustomLinkButton
            href="/dashboard/customer/new"
            className="btn-customer-new"
          >
            Abrir novo chamado
          </CustomLinkButton>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {customers.map((customer) => (
            <CardCustomer 
            key={customer.id} 
            customer={customer}
            />
          ))}
        </section>
      </main>
    </Container>
  );
};

export default Customer;
