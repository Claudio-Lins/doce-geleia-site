import ProductCard from "@/components/ProductCard"
import React from "react"
import prisma from "@/lib/prisma"

export default async function Products() {
  // const products = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/products`
  // ).then((res) => res.json())
  const products = await prisma.product.findMany({
    include: {
      productDetail: true,
      category: true,
      ingredients: true,
    },
  })
  return (
    <div className="flex w-full max-w-6xl mx-auto sm:mt-16 min-h-screen sm:px-36 items-center justify-center">
      <div className="flex flex-wrap justify-center gap-4 md:gap-10">
        {products.map((product: any) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}
