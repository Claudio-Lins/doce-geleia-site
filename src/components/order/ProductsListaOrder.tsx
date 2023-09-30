"use client"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { useState } from "react"
import { Product } from "@/@types"

const arrayImage = [
  "Abacaxi com Pimenta Rosa",
  "Pimenta",
  "Laranja com Damasco",
  "Frutas Vermelhas",
  "Frutas Amarelas",
  "Tomate com Manjericão",
  "Abacaxi com Gengibre",
]

interface ProductsListaOrderProps {
  products: Product[]
}

export function ProductsListaOrder({ products }: ProductsListaOrderProps) {
  const [showName, setShowName] = useState("")

  function handleShowName(index: any) {
    setShowName(products[index].title)
  }

  return (
    <div className="mt-2 w-full">
      <h2 className="font-bold text-base text-center">Sabores relacionados</h2>
      <Separator className="my-2" />
      <div className="w-full flex items-center justify-center gap-2">
        {products.map((product, i) => (
          <Image
            onMouseOver={() => handleShowName(i)}
            key={product.id}
            src={product.coverUrl ?? ""}
            alt={product.title}
            width={123 * 0.4}
            height={110}
            priority
            className=" p-2 cursor-pointer"
          />
        ))}
      </div>
      {showName && (
        <div className="w-full flex justify-center mt-2">
          <Badge variant={"secondary"} className="text-center">
            {showName}
          </Badge>
        </div>
      )}
    </div>
  )
}
