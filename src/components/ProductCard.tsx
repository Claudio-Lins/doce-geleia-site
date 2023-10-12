"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { MouseEventHandler } from "react"
import { title } from "process"

interface ProductCardProps {
  product: any
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/products/${product?.slug}`)
  }
  return (
    <div
      onClick={handleClick}
      className="group relative flex h-[205px] w-[170px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border shadow-md"
    >
      <div className="relative flex h-[205px] w-[170px] ">
        <Image
          src={product?.coverUrl}
          alt={product?.title}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="object-contain object-right-top bg-top"
        />
      </div>

      <div className="absolute bottom-0 flex h-[45px] w-full items-center justify-center border-t border-white bg-zinc-900 px-2 text-center font-Montserrat text-xs leading-4 text-white">
        {product?.title}
      </div>
    </div>
  )
}
