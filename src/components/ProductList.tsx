"use client"
import { Key } from "react"
import { ProductCard } from "./_ProductCard"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Product } from "@/@types"

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const pathname = usePathname()
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {products
        .filter((product: Product) => product.slug !== pathname.slice(10))
        .map((product: { id: Key | null | undefined }) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}
