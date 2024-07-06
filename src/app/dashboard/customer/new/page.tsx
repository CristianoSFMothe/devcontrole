import { Container } from "@/components/container";
import CustomLinkButton from "@/app/dashboard/components/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";

const NewCustomer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <CustomLinkButton className="btn-back" href="/dashboard/customer">
            Voltar
          </CustomLinkButton>

          <h2 className="text-3xl font-bold text-white">Novo Cliente</h2>
        </div>

        <NewCustomerForm />
      </main>
    </Container>
  );
};

export default NewCustomer;
