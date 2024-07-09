import { CustomerProps } from "@/utils/customer.type";

const CardCustomer = ({ customer }: { customer: CustomerProps }) => {
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

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start hover:opacity-75 btn-delete">
        Deletar
      </button>
    </article>
  );
};

export default CardCustomer;
