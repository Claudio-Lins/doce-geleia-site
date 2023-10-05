"use client"
import { MinusCircle, PlusCircle } from "lucide-react"
import Currency from "./currency"

import { Separator } from "./ui/separator"
import { useCartStore } from "@/hooks/useCartStore"
import { SelectedProduct } from "@/@types"

export function Info({ product }: any) {
  const { addItem, items, removeItem } = useCartStore()

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
          <h2 className="font-semibold text-black">Tamanhos</h2>
          <div className="flex items-center gap-2">
            <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
              <span className="text-xs">50gr</span>
              <div className="text-sm font-bold">
                <Currency value={250 / 100} />
              </div>
              <div className="flex items-center">
                <button onClick={() => removeItem(product.id, "50gr")}>
                  <MinusCircle />
                </button>
                <div className="w-8 text-center">
                  {items.find(
                    (item: SelectedProduct) =>
                      item.id === product.id && item.size === "50gr"
                  )?.quantity ?? 0}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      ...product,
                      size: "50gr",
                      price: 250,
                      weight: 50,
                    })
                  }
                >
                  <PlusCircle />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
              <span className="text-xs">130gr</span>
              <div className="text-sm font-bold">
                <Currency value={400 / 100} />
              </div>
              <div className="flex items-center">
                <button onClick={() => removeItem(product.id, "130gr")}>
                  <MinusCircle />
                </button>
                <div className="w-8 text-center">
                  {items.find(
                    (item: SelectedProduct) =>
                      item.id === product.id && item.size === "130gr"
                  )?.quantity ?? 0}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      ...product,
                      size: "130gr",
                      price: 400,
                      weight: 130,
                    })
                  }
                >
                  <PlusCircle />
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
              <span className="text-xs">250gr</span>
              <div className="text-sm font-bold">
                <Currency value={500 / 100} />
              </div>
              <div className="flex items-center">
                <button onClick={() => removeItem(product.id, "250gr")}>
                  <MinusCircle />
                </button>
                <div className="w-8 text-center">
                  {items.find(
                    (item: SelectedProduct) =>
                      item.id === product.id && item.size === "250gr"
                  )?.quantity ?? 0}
                </div>
                <button
                  onClick={() =>
                    addItem({
                      ...product,
                      size: "250gr",
                      price: 500,
                      weight: 250,
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
