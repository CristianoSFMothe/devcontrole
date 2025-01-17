import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import CustomLinkButton from "../../components/link";
import prismaClient from "@/lib/prisma";
import { ButtonRefresh } from "./components/buttonRefresh";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      // status: "ABERTO",
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between dashboard-new">
          <h1 className="text-white text-3xl font-bold">Chamados</h1>

          <div className="flex items-center gap-3">
            <ButtonRefresh />
            <CustomLinkButton
              href="/dashboard/new"
              className="btn-dashboard-new"
            >
              Abrir novo chamado
            </CustomLinkButton>
          </div>
        </div>

        <table className="min-w-full my-2 bg-white rounded">
          <thead>
            <tr>
              <th className="font-medium text-left pl-4">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                DATA CADASTRO
              </th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                customer={ticket.customer}
                ticket={ticket}
              />
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <h1 className="px2 md:px-0 text-gray-300">
            Nenhum chamado aberto foi encontrado...
          </h1>
        )}
      </main>
    </Container>
  );
};

export default Dashboard;
