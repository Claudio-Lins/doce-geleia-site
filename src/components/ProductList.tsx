"use client"

import { usePathname } from "next/navigation"
import { Product } from "@/@types"
import { ProductCard } from "./ProductCard"

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const pathname = usePathname()
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {products
        .filter((product: Product) => product.slug !== pathname.slice(10))
        .map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}
