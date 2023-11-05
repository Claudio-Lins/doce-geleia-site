import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const jam = await prisma.product.update({
    where: { id: body.id },
    data: {
      isDestack: body.isDestack,
    },
  });
  return NextResponse.json(jam);
}
