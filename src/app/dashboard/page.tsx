import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between dashboard-new">
          <h1 className="text-white text-3xl font-bold">Chamados</h1>

          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white btn-dashboard-new"
          >
            Abrir novo chamado
          </Link>
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
            <TicketItem />

            <TicketItem />
          </tbody>
        </table>
      </main>
    </Container>
  );
};

export default Dashboard;
