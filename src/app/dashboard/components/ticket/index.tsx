import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiTrash2, FiFile } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 hover:bg-gray-100 duration-300">
        <td className="text-left px-4 customer-name">
          {customer?.name}
        </td>
        <td className="text-left hidden sm:table-cell date-register">{ticket.created_at?.toLocaleDateString("pt-br") }</td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded-lg status">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="btn-trash mr-2 hover:opacity-75">
            <FiTrash2 size={24} color="#EF4444" />
          </button>
          <button className="btn-file hover:opacity-75">
            <FiFile size={24} color="#3B82F6" />
          </button>
        </td>
      </tr>
    </>
  );
}
