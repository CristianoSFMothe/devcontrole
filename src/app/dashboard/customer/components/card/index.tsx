"use client";

import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";

const CardCustomer = ({ customer }: { customer: CustomerProps }) => {
  const router = useRouter();

  const handleDeleteCustomer = async () => {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      toast.success("Cliente excluído com sucesso!", {
        icon: <AiOutlineDelete style={{ color: 'red' }} />,
        progressStyle: { background: 'red' },
      });

      router.refresh()
      
    } catch (err) {
      toast.error("Erro ao excluir cliente. Tente novamente.", {
        icon: <AiOutlineCloseCircle style={{ color: 'red' }} />,
        progressStyle: { background: 'red' },
      });
    }
  };

  return (
    <article className="flex flex-col bg-gray-50 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300 customer-card">
      <h2>
        <a className="font-bold customer-name">Nome:</a> {customer.name}
      </h2>
      <p>
        <a className="font-bold customer-email">E-mail:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold customer-phone">Telefone:</a> {customer.phone}
      </p>

      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start hover:opacity-75 btn-delete"
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  );
};

export default CardCustomer;
