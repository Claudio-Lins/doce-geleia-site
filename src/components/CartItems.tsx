"use client"

// import { ProductTypes } from "@/@types"
import Image from "next/image"
import { useEffect, useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Currency from "./currency"
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/context/cartContext"

interface CartItemsProps {
  // products: ProductTypes[]
}
interface CartItemTypes {
  id: string
  productId: string
  weight: string
  price: number
  quantity: number
  detailId: string
  title: string
  coverUrl: string
}

export function CartItems() {
  const cart = useCartStore()
  const [myData, setMyData] = useState<any>(null)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  // const { addToCart, cartItems } = useCartStore()

  const handleIncrement = (detailId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [detailId]: (prevQuantities[detailId] || 0) + 1,
    }))
  }
  const handleDecrement = (detailId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [detailId]: Math.max((prevQuantities[detailId] || 0) - 1, 0),
    }))
  }

  const totalQuantity = myData
    ?.map((item: any) => item.quantity)
    .reduce((prev: any, next: any) => prev + next, 0)

  useEffect(() => {
    const readLocalStorageData = () => {
      const data = localStorage.getItem("cartItems")
      if (data) {
        setMyData(JSON.parse(data))
      }
    }

    readLocalStorageData()
  }, [])

  // total by weigh
  const totalByProductId = myData?.reduce((acc: any, item: any) => {
    if (!acc[item.productId]) {
      acc[item.productId] = 0
    }
    acc[item.productId] += (item.price / 100) * item.quantity
    return acc
  }, {})

  // totalQuantityByProductId
  const totalQuantityByProductId = myData?.reduce((acc: any, item: any) => {
    if (!acc[item.productId]) {
      acc[item.productId] = 0
    }
    acc[item.productId] += item.quantity
    return acc
  }, {})

  const total = myData?.reduce(
    (acc: any, item: any) => acc + item.price * item.quantity,
    0
  )

  return (
    <div className="w-full">
      <Sheet>
        <SheetTrigger className="flex items-center gap-2">
          <ShoppingCart /> {cart.cart.length}
        </SheetTrigger>
        <SheetContent className="h-[calc(100vh)] w-full sm:w-[640px] border-r-pink-400">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              Seu carrinho <ShoppingCart />
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
            <Separator />
            <ScrollArea className="h-[calc(70vh)]">
              {cart.cart?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mt-4"
                >
                  <Image
                    src={item.coverUrl}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                  <div className="">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-xs">{item.weight}</p>
                    <p className="text-xs">
                      <Currency value={item.price / 100} />
                    </p>
                  </div>
                  <div className="flex px-4 items-center justify-evenly gap-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className={cn(
                        "opacity-10",
                        quantities[item.id] >= 1 && "opacity-100"
                      )}
                    >
                      <MinusCircle />
                    </button>
                    <span className="">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className=""
                    >
                      <PlusCircle />
                    </button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </SheetHeader>
          <Separator />
          <div className="flex items-center justify-between mt-6">
            <p>Total</p>
            <Currency value={total / 100} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
