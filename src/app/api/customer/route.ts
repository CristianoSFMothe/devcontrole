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
      { erro: "Failed create a new customer" },
      { status: 400 }
    );
  }
};
