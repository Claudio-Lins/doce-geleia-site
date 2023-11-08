import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}
