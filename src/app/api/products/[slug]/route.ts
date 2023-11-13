import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  });
  if (product && product.productDetail) {
    product.productDetail = product.productDetail.map((detail) => ({
      ...detail,
      price: detail.price - detail.price * detail.discount!,
    }));
  }
  return NextResponse.json(product);
}
