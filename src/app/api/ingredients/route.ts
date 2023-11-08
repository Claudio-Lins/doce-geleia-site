import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const ingredients = await prisma.ingredient.findMany();
  return NextResponse.json(ingredients);
}
