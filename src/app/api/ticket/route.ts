import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export const PATCH = async(request: Request) => {
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

    const { id } = await request.json();

    const findTicket = await prismaClient.ticket.findFirst({
      where: { id: id as string },
    });

    if (!findTicket) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Falha ao atualizar o chamado: ticket não encontrado",
            data: { request: { id } },
          },
          null,
          2
        ),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const updatedTicket = await prismaClient.ticket.update({
        where: { id: id as string },
        data: { status: "FECHADO" },
      });

      return new NextResponse(
        JSON.stringify(
          {
            success: true,
            message: "Chamado atualizado com sucesso",
            data: { request: { id }, updatedTicket },
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
            message: "Falha ao atualizar o chamado",
            data: { request: { id }, error: errorMessage },
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
}

export const POST = async (request: Request) => {
  try {
    const { customerId, name, description } = await request.json();

    if (!customerId || !name || !description) {
      return new NextResponse(
        JSON.stringify(
          {
            success: false,
            message: "Falha ao cadastrar novo chamado",
            data: { request: { customerId, name, description } },
          },
          null,
          2
        ),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const newTicket = await prismaClient.ticket.create({
        data: {
          name: name,
          description: description,
          status: "ABERTO",
          customerId: customerId,
        },
      });

      return new NextResponse(
        JSON.stringify(
          {
            success: true,
            message: "Chamado registrado com sucesso!",
            data: { request: { customerId, name, description }, newTicket },
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
            message: "Falha ao cadastrar novo chamado",
            data: {
              request: { customerId, name, description },
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


export const GET = async (request: Request) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const tickets = await prismaClient.ticket.findMany();

    return NextResponse.json(tickets, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar os tickets:", err);
    return NextResponse.json({ error: "Erro ao buscar os tickets" }, { status: 500 });
  }
};