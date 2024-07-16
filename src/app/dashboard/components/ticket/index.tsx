"use client";

import { useContext } from "react";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext)
  const [status, setStatus] = useState(ticket.status);

  const handleChangeStatus = async () => {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      // TODO: Implementar um Toast para mensagem de sucesso de alteração do status
      setStatus(response.data.status);
      router.refresh();

      console.log(response.data);
    } catch (err) {
      console.log(err);
      // TODO: Implementar um Toast para notificar o erro de alteração do status
    }
  };

  const handleOpenModal = () => {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    })
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 hover:bg-gray-100 duration-300">
        <td className="text-left px-4 customer-name">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell date-register">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span
            className={`px-2 py-1 rounded-lg text-white font-normal
          status ${status === "ABERTO" ? "bg-green-500" : "bg-red-500"}`}
          >
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button
            className={`btn-check mr-3 hover:opacity-75 ${
              status === "FECHADO" ? "cursor-not-allowed opacity-100" : ""
            }`}
            onClick={handleChangeStatus}
            disabled={status === "FECHADO"}
          >
            <FiCheckSquare size={24} color="#131313" />
          </button>
          <button className="btn-open-modal hover:opacity-75" onClick={handleOpenModal}>
            <FiFile size={24} color="#3B82F6" />
          </button>
        </td>
      </tr>
    </>
  );
}
