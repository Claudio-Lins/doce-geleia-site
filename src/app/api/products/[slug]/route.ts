import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest, res: NextResponse) {
  const { slug } = req.query;
  const product = await prisma.product.findUnique({
    where: {
      slug: slug as string,
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
      price: detail.price - (detail.price * detail.discount!) / 100,
    }));
    return NextResponse.json(product);
  }
}
