import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ erro: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId: userId,
      },
    });
    return NextResponse.json(
      { message: "Cliente cadastrado com sucesso" },
      { status: 202 }
    );
  } catch (err) {
    return NextResponse.json(
      { erro: "Falha ao criar um novo cliente" },
      { status: 400 }
    );
  }
};

export const DELETE = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "Falha ao delete cliente" },
      { status: 400 }
    );
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId
    }
  })

  if(findTickets) {
    return NextResponse.json(
      { error: "Falha ao delete cliente" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json(
      { message: "Cliente cadastrado com sucesso!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Falha ao delete cliente" },
      { status: 400 }
    );
  }
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email")

  if(!customerEmail || customerEmail === "") {
    return NextResponse.json({ message: "Cliente não encontrado"}, { status: 400 })
    
  }

  try{
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail
      }
    })

    return NextResponse.json(customer)

  }catch(err) {
    return NextResponse.json({ message: "Cliente não encontrado"}, { status: 400 })
  }
}