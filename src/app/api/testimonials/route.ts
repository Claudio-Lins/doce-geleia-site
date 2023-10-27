import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const testimonials = await prisma.testimonial.findMany();
  return NextResponse.json(testimonials);
}
