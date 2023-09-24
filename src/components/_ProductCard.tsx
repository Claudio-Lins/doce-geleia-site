"use client"
import Image from "next/image"
import { Separator } from "./ui/separator"
import Link from "next/link"

interface ProductCardProps {
  product: any
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex w-[100px] h-[100px] flex-col justify-center rounded-md border px-2 py-1 text-center text-[10px] leading-3 shadow-sm space-y-1">
      <Link className="mx-auto" href={`/products/${product.slug}`}>
        <Image
          src={product.coverUrl}
          alt={product.title}
          width={50}
          height={50}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Link>
      <Separator />
      <div className="w-full h-[25px] flex items-center justify-center">
        <strong>{product.title}</strong>
      </div>
    </div>
  )
}
