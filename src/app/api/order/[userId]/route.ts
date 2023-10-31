import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const order = await prisma.order.findMany({
    where: {
      userId: params.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      selectedProducts: true,
    },
  });

  return NextResponse.json(order);
}
