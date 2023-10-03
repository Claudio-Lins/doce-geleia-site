"use client"
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"

import { ProductDetail, Product, Category, Ingredient } from "@/@types"
import Currency from "./currency"

import { Separator } from "./ui/separator"
import { use, useEffect, useState } from "react"
import { useCartStore } from "@/hooks/useCartStore"

interface SelectedProduct {
  id: string
  title: string
  price: number
  weight: string
  size: string
  quantity: number
}

export function Info({ product }: any) {
  const { addItem, items, removeItem } = useCartStore()
  // const addItem = useCartStore((state) => state.addItem)
  // const items = useCartStore((state) => state.items)
  // const removeItem = useCartStore((state) => state.removeItem)
  // useLocalStorage()
  // const { add, productSelected } = useOrderStore()
  const [hasProductSelected, setHasProductSelected] = useState<boolean>(false)

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
      <Separator className="my-4" />
      <div>
        <h3 className="font-semibold text-black">Vai bem com:</h3>
        <p className="text-xs tracking-wider leading-relaxed">
          {product.harmonization}
        </p>
      </div>
      <Separator className="my-4" />

      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col w-full">
          <h2 className="font-bold text-lg">{product.title}</h2>
          <div className="flex items-center gap-2">
            <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
              <span className="text-xs">50gr</span>
              <span className="text-sm font-bold">
                <Currency value={250 / 100} />
              </span>
              <div className="flex items-center">
                <button onClick={() => removeItem(product.id, "50gr")}>
                  <MinusCircle />
                </button>
                <div className="w-8 text-center">
                  {items.length
                    ? items.filter(
                        (item: SelectedProduct) =>
                          item.id === product.id && item.size === "50gr"
                      )[0]?.quantity
                    : 0}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      ...product,
                      size: "50gr",
                      price: 250,
                    })
                  }
                >
                  <PlusCircle />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
              <span className="text-xs">130gr</span>
              <span className="text-sm font-bold">
                <Currency value={400 / 100} />
              </span>
              <div className="flex items-center">
                <button onClick={() => removeItem(product.id, "130gr")}>
                  <MinusCircle />
                </button>
                <div className="w-8 text-center">
                  {items.length
                    ? items.filter(
                        (item: SelectedProduct) =>
                          item.id === product.id && item.size === "130gr"
                      )[0]?.quantity
                    : 0}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      ...product,
                      size: "130gr",
                      price: 400,
                    })
                  }
                >
                  <PlusCircle />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
              <span className="text-xs">250gr</span>
              <span className="text-sm font-bold">
                <Currency value={500 / 100} />
              </span>
              <div className="flex items-center">
                <button onClick={() => removeItem(product.id, "250gr")}>
                  <MinusCircle />
                </button>
                <div className="w-8 text-center">
                  {items.length
                    ? items.filter(
                        (item: SelectedProduct) =>
                          item.id === product.id && item.size === "250gr"
                      )[0]?.quantity
                    : 0}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      ...product,
                      size: "250gr",
                      price: 500,
                    })
                  }
                >
                  <PlusCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
