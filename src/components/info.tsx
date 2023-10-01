"use client"

import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"

import { ProductDetail, Product, Category, Ingredient } from "@/@types"
import Currency from "./currency"

import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { useOrderStore } from "@/context/orderStore"
import { use, useEffect, useState } from "react"
import { useCartStore } from "@/hooks/useCartStore"
// import { useCartStore } from "@/context/cartContext"

interface ProductProps {
  product: Product
}

export function Info({ product }: any) {
  const addItem = useCartStore((state) => state.addItem)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  // const { add, productSelected } = useOrderStore()
  const [hasProductSelected, setHasProductSelected] = useState<boolean>(false)
  // const { addToCart, cart } = useCartStore()

  // function handleAddToCart() {
  //   add(product)
  //   toast.success("Produto adicionado ao seu carrinho")
  // }

  // useEffect(() => {
  //   productSelected.some((item: any) => item.id === product.id) &&
  //     setHasProductSelected(true)
  // }, [product.id, productSelected])

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
      <div className="w-full mt-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div>
            <h2>{product.title}</h2>
            <button onClick={() => addItem({ ...product, size: "50gr" })}>
              Adicionar tamanho S ao carrinho
            </button>
            <button onClick={() => addItem({ ...product, size: "130gr" })}>
              Adicionar tamanho M ao carrinho
            </button>
            <button onClick={() => addItem({ ...product, size: "250gr" })}>
              Adicionar tamanho L ao carrinho
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div>
            {items.map((item: any) => (
              <div className="flex flex-col" key={item.id}>
                <span>{item.title}</span>
                <span>{item.size}</span>
                <button>-</button>
                <span>{item.quantity}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
        <pre>
          {JSON.stringify(items, null, 2)}
          {/* {JSON.stringify(cart, null, 2)} */}
        </pre>
      </div>
    </div>
  )
}
