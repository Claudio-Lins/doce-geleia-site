import { prisma } from "@/lib/prisma";
import { Ingredient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ProductTypes {
  id: string;
  title: string;
  slug: string;
  coverUrl: string | null;
  harmonization: string | null;
  validate: string | null;
  isDestack: boolean;
  categoryId: string | null;
  ingredients: Ingredient[];
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

export async function PUT(req: NextRequest, res: NextResponse) {
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
    const updatedProduct = await prisma.product.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: body.slug,
        coverUrl: body.coverUrl,
        harmonization: body.harmonization,
        validate: body.validate,
        isDestack: body.isDestack,
        categoryId: body.categoryId,
        productDetail: {
          update: body.productDetail.map((detail) => ({
            where: { id: detail.id },
            data: {
              weight: detail.weight,
              netWeight: detail.netWeight,
              price: detail.price,
              discount: detail.discount,
              qunatityInStock: detail.qunatityInStock,
            },
          })),
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

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

// export async function PUT(req: NextRequest, res: NextResponse) {
//   const body: ProductTypes = await req.json();

//   try {
//     for (const id of body.ingredients) {
//       const existingIngredient = await prisma.ingredient.findUnique({
//         // @ts-ignore
//         where: { id },
//       });

//       if (!existingIngredient) {
//         return NextResponse.json({
//           error: `Ingredient with id ${id} not found`,
//         });
//       }
//     }
//     const updatedProduct = await prisma.product.update({
//       where: { id: body.id },
//       data: {
//         title: body.title,
//         slug: body.slug,
//         coverUrl: body.coverUrl,
//         harmonization: body.harmonization,
//         validate: body.validate,
//         isDestack: body.isDestack,
//         categoryId: body.categoryId,
//         productDetail: {
//           update: body.productDetail.map((detail) => ({
//             where: { id: detail.id },
//             data: {
//               weight: detail.weight,
//               netWeight: detail.netWeight,
//               price: detail.price,
//               discount: detail.discount,
//               qunatityInStock: detail.qunatityInStock,
//             },
//           })),
//         },
//         ingredients: {
//           connect: body.ingredients,
//         },
//       },
//       include: {
//         productDetail: true,
//         category: true,
//         ingredients: true,
//       },
//     });

//     return NextResponse.json(updatedProduct);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message });
//   }
// }
