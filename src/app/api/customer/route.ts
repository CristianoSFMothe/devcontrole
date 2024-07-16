import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Not authorized",
            data: {},
          },
          null,
          2
        ),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, email, phone, address, userId } = await request.json();

    if (!name || !email || !phone || !userId) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Missing required fields",
            data: { request: { name, email, phone, address, userId } },
          },
          null,
          2
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificar se o nome já existe
    const existingCustomer = await prismaClient.customer.findFirst({
      where: {
        name,
      },
    });

    if (existingCustomer) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "O nome do cliente já está em uso. Escolha um nome diferente.",
            data: { request: { name, email, phone, address, userId } },
          },
          null,
          2
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const newCustomer = await prismaClient.customer.create({
        data: {
          name,
          phone,
          email,
          address: address ? address : "",
          userId: userId,
        },
      });

      return new NextResponse(
        JSON.stringify(
          {
            success: true,
            message: "Cliente cadastrado com sucesso",
            data: {
              request: { name, email, phone, address, userId },
              newCustomer,
            },
          },
          null,
          2
        ),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Falha ao criar um novo cliente",
            data: {
              request: { name, email, phone, address, userId },
              error: errorMessage,
            },
          },
          null,
          2
        ),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    return new NextResponse(
      JSON.stringify(
        {
          success: false,
          message: "Falha ao processar a requisição",
          data: { error: errorMessage },
        },
        null,
        2
      ),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Não autorizado",
            data: {},
          },
          null,
          2
        ),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Parâmetro obrigatório ausente",
            data: {},
          },
          null,
          2
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const findTickets = await prismaClient.ticket.findFirst({
      where: {
        customerId: userId,
      },
    });

    if (findTickets) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Não é possível excluir cliente com chamados existentes",
            data: {},
          },
          null,
          2
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const deletedCustomer = await prismaClient.customer.delete({
        where: {
          id: userId as string,
        },
      });

      return new NextResponse(
        JSON.stringify(
          {
            success: true,
            message: "Cliente removido com sucesso",
            data: { deletedCustomer },
          },
          null,
          2
        ),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Falha ao remove o cliente",
            data: { error: errorMessage },
          },
          null,
          2
        ),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    return new NextResponse(
      JSON.stringify(
        {
          success: false,
          message: "Falha ao processar a solicitação",
          data: { error: errorMessage },
        },
        null,
        2
      ),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("email");

    if (!customerEmail || customerEmail.trim() === "") {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Parâmetro de e-mail ausente ou vazio",
            data: {},
          },
          null,
          2
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const customer = await prismaClient.customer.findFirst({
        where: {
          email: customerEmail,
        },
      });

      if (!customer) {
        return new NextResponse(
          JSON.stringify(
            {
              success: false,
              message: "Cliente não encontrado",
              data: {},
            },
            null,
            2
          ),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      return new NextResponse(
        JSON.stringify(
          {
            success: true,
            message: "Cliente recuperado com sucesso",
            data: { customer },
          },
          null,
          2
        ),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Falha ao recuperar o cliente",
            data: { error: errorMessage },
          },
          null,
          2
        ),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
    return new NextResponse(
      JSON.stringify(
        {
          success: false,
          message: "Falha ao processar a solicitação",
          data: { error: errorMessage },
        },
        null,
        2
      ),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
