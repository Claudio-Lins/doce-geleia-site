"use client"

import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"

import { ProductDetail, Product, Category, Ingredient } from "@/@types"
import Currency from "./currency"

import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { useOrderStore } from "@/context/orderStore"

interface ProductProps {
  product: Product
}

export function Info({ product }: any) {
  const { add, productSelected } = useOrderStore()
  function handleAddToCart() {
    add(product)
    toast.success("Produto adicionado ao seu carrinho")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
      <small>{product.category.title}</small>
      <hr className="my-4" />
      <h3 className="font-semibold text-black">Ingredients:</h3>
      <div className="flex flex-wrap gap-2 items-center mb-4 mt-2">
        {product.ingredients?.map((ingredient: any) => (
          <span key={ingredient.id} className="text-xs">
            {ingredient.name}
          </span>
        ))}
      </div>
      <Separator />
      <div className="my-4">
        <h3 className="font-semibold text-black">Vai bem com:</h3>
        <p className="text-xs tracking-wider leading-relaxed">
          {product.harmonization}
        </p>
      </div>
      <Separator />
      <div className="mt-10 flex flex-wrap justify-evenly items-center gap-2"></div>
      <div className="w-full mt-6 flex justify-center">
        <Button
          disabled={productSelected.some((item: any) => item.id === product.id)}
          onClick={handleAddToCart}
          className="w-full flex items-center gap-2"
        >
          <span>
            {productSelected.some((item: any) => item.id === product.id)
              ? "Adicionado ao"
              : "Adicionar"}
          </span>{" "}
          <ShoppingCart size={16} />
        </Button>
      </div>
    </div>
  )
}
