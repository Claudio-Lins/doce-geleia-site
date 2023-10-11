"use client"
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"
import Currency from "./currency"

import { Separator } from "./ui/separator"
import { useCartStore } from "@/hooks/useCartStore"
import { SelectedProduct } from "@/@types"
import { Button } from "./ui/button"

interface ProductOption {
  size: string
  price: number
  weight: number
}

const productOptions: ProductOption[] = [
  { size: "50gr", price: 250, weight: 50 },
  { size: "130gr", price: 500, weight: 130 },
  { size: "250gr", price: 700, weight: 250 },
]

function CartItem({
  product,
  option,
}: {
  product: any
  option: ProductOption
}) {
  const { addItem, items, removeItem } = useCartStore()

  return (
    <div className="flex flex-col justify-between gap-1 p-2 rounded-md border">
      <span className="text-xs">{option.size}</span>
      <div className="text-sm font-bold">
        <Currency value={option.price / 100} />
      </div>
      <div className="flex items-center">
        <button onClick={() => removeItem(product.id, option.size)}>
          <MinusCircle />
        </button>
        <div className="w-8 text-center">
          {items.find(
            (item: SelectedProduct) =>
              item.id === product.id && item.size === option.size
          )?.quantity ?? 0}
        </div>
        <button
          onClick={() =>
            addItem({
              ...product,
              size: option.size,
              price: option.price,
              weight: option.weight,
            })
          }
        >
          <PlusCircle />
        </button>
      </div>
    </div>
  )
}

export function Info({ product }: any) {
  const { addItem, items, removeItem, totalItems, setShowCart } = useCartStore()

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
          <h2 className="font-semibold text-black">Adicione ao carrinho</h2>
          <div className="flex items-center justify-evenly gap-2">
            {productOptions.map((option) => (
              <CartItem key={option.size} product={product} option={option} />
            ))}
          </div>
          {totalItems > 0 && (
            <Button
              onClick={() => setShowCart(true)}
              className="w-full mt-4 flex items-center gap-2"
            >
              <span>Adicionado ao</span> <ShoppingCart size={16} />
              {totalItems}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
