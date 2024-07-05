import { Container } from "@/components/container"
import Link from "next/link"

const DashboardHeader = () => {
  return(
    <Container>
      <header className="w-full bg-white my-4 p-3 rounded flex gap-4 items-center">
        <Link href="dashboard" className="customer-dashboard hover:font-bold hover:text-blue-500 duration-300">
          Chamados
        </Link>
        <Link href="dashboard/customer" className="client-dashboard hover:font-bold hover:text-blue-500 duration-300">
          Clientes
        </Link>
      </header>
    </Container>
  )
}

export default DashboardHeader;