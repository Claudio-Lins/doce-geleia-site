import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface TestimonialTypes {
  name: string;
  testimonial: string;
  email: string | null;
  imageUrl: string | null;
  published: boolean;
}

export async function GET(req: NextRequest, res: NextResponse) {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

// PUT
export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const testimonial: TestimonialTypes = {
    name: body.name,
    testimonial: body.testimonial,
    email: body.email,
    imageUrl: body.imageUrl,
    published: body.published,
  };

  try {
    const data = await prisma.testimonial.update({
      where: { id: body.id },
      data: testimonial,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
