import { Container } from "@/components/container";
import { getServerSession } from "next-auth"
import { authOptions} from "@/lib/auth"
import { redirect } from "next/navigation";


const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/")
  }

  return (
    <Container>
      <h1 className="text-white">Página Dashboard</h1>
    </Container>
  );
};

export default Dashboard;
