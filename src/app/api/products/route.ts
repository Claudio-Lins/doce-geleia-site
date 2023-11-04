import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ProductTypes {
  title: string;
  slug: string;
  coverUrl: string | null;
  harmonization: string | null;
  validate: string | null;
  isDestack: boolean;
  categoryId: string | null;
  ingredients: [
    {
      id: string;
    },
  ];
  createdAt: Date;
  productDetail: {
    id: string;
    weight: number;
    netWeight: number;
    discount?: number;
    price: number;
    qunatityInStock: number;
  }[];
}

export async function GET(req: NextRequest, res: NextResponse) {
  const products = await prisma.product.findMany({
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body: ProductTypes = await req.json();

  try {
    for (const ingredient of body.ingredients) {
      const existingIngredient = await prisma.ingredient.findUnique({
        where: { id: ingredient.id },
      });

      if (!existingIngredient) {
        return NextResponse.json({
          error: `Ingredient with id ${ingredient.id} not found`,
        });
      }
    }
    const newProduct = await prisma.product.create({
      data: {
        title: body.title,
        slug: body.slug,
        coverUrl: body.coverUrl,
        harmonization: body.harmonization,
        validate: body.validate,
        isDestack: body.isDestack,
        categoryId: body.categoryId,
        createdAt: body.createdAt,
        productDetail: {
          create: body.productDetail,
        },
        ingredients: {
          connect: body.ingredients.map((ingredient) => ({
            id: ingredient.id,
          })),
        },
      },
      include: {
        productDetail: true,
        category: true,
        ingredients: true,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
