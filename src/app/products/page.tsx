import ProductCard from "@/components/ProductCard"
import React from "react"
import prisma from "@/lib/prisma"
import { Separator } from "@/components/ui/separator"

export default async function Products() {
  const products = await prisma.product.findMany({
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  })
  return (
    <div className="flex flex-col w-full md:h-screen pb-12 pt-24 px-2 sm:p-0 max-w-6xl mx-auto justify-center">
      <h1 className="font-bold text-2xl">Sabores</h1>
      <span>Escolha aqui os sabores</span>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center gap-4 md:mt-10 md:gap-10">
        {products.map((product: any) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
