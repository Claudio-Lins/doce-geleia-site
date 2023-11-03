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

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  const testimonial: TestimonialTypes = {
    name: body.name,
    testimonial: body.testimonial,
    email: body.email,
    imageUrl: body.imageUrl,
    published: body.published,
  };

  try {
    const data = await prisma.testimonial.create({
      data: testimonial,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
