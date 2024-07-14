import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import prismaClient from "@/lib/prisma"

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if(!session || !session.user) {
    return NextResponse.json({ error: "Não autorizado"}, { status: 401 })
  }

  const { id } = await request.json()

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string
    }
  })

  if(!findTicket) {
    return NextResponse.json({ error: "Falha ao atualizar o chamado"}, { status: 400 })
  }

  try{
    await prismaClient.ticket.update({
      where: {
        id: id as string
      },
      data: {
        status: "FECHADO"
      }
    })
    return NextResponse.json({ error: "Chamado atualizado com sucesso"}, { status: 200 })

  }catch(err) {
    return NextResponse.json({ error: "Falha ao atualizar o chamado"}, { status: 400 })
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if(!customerId || !name || !description) {
    return NextResponse.json({ message: "Falha ao cadastrar novo chamando"}, { status: 400 })
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name: name,
        description: description,
        status: "ABERTO",
        customerId: customerId,
      }
    })
    return NextResponse.json({ message: "Chamado registrado com sucesso!"}, { status: 202 })

  }catch(err) {
    return NextResponse.json({ message: "Falha ao cadastrar novo chamado"}, { status: 400 })
  }
}