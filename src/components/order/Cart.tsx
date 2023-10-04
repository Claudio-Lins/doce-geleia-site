"use client"
import React, { useEffect } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { useCartStore } from "@/hooks/useCartStore"
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { toast } from "react-hot-toast"
import Currency from "../currency"
import Image from "next/image"

interface SelectedProduct {
  id: string
  title: string
  coverUrl: string
  price: number
  weight: number
  size: string
  quantity: number
}
interface OrderDetails {
  id: string
  title: string
  coverUrl: string
  productDetail: {
    id: string
    weight: string
    price: number
    quantity: number
    productId: string
    createdAt: string
  }[]
}

export function Cart() {
  const {
    items,
    setShowCart,
    showCart,
    removeItem,
    addItem,
    setTotalItems,
    totalItems,
    setTotalPrice,
    totalPrice,
  } = useCartStore()

  const pathName = usePathname()

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items, setShowCart])

  useEffect(() => {
    setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0))
    setTotalPrice(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
    if (items.length === 0) {
      setShowCart(false)
    }
  }, [items, setShowCart, setTotalItems, setTotalPrice])

  return (
    <div className={cn("w-full", totalItems >= 1 ? "flex" : "hidden")}>
      <Sheet onOpenChange={setShowCart} open={showCart}>
        <SheetTrigger>
          <div
            className={cn(
              " flex items-center gap-2 text-zinc-900",
              pathName === "/" ? "text-white" : "text-zinc-900"
            )}
          >
            <div className="flex items-center gap-1">
              <ShoppingCart
                strokeWidth={1.2}
                className={cn(
                  "w-6 h-6 cursor-pointer font-light",
                  pathName === "/" ? "text-white" : "text-zinc-900"
                )}
              />
              {totalItems}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-none sm:w-[800px]">
          <SheetHeader>
            <SheetTitle>Carrinho de compras</SheetTitle>
          </SheetHeader>
          <Separator className="mt-8" />

          <ScrollArea className="h-[calc(60vh)] pb-6">
            <div className=" flex flex-wrap gap-4 justify-center mt-4">
              {items
                .sort((a, b) => a.weight - b.weight)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item: SelectedProduct) => (
                  <div
                    className="border w-36 p-2 rounded-lg relative bg-white shadow-sm"
                    key={item.id}
                  >
                    <Image
                      src={item.coverUrl}
                      width={100}
                      height={100}
                      alt={item.title}
                      className="bg-cover bg-center"
                    />
                    <p className="text-xs leading-4 font-semibold text-center w-full">
                      {item.title}
                    </p>
                    <p className="w-full text-center text-xs font-bold mt-2">
                      {item.size}
                    </p>
                    <Separator className="my-2" />
                    <div className="flex w-full justify-center gap-2 items-center">
                      <button onClick={() => removeItem(item.id, item.size)}>
                        <MinusCircle />
                      </button>
                      <p className="w-6 text-center">{item.quantity}</p>
                      <button
                        onClick={() =>
                          addItem({
                            ...item,
                            size: item.size,
                            price: item.price,
                            weight: item.weight,
                          })
                        }
                      >
                        <PlusCircle />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
          </ScrollArea>
          <Separator className="mb-4" />
          <SheetFooter className="w-full">
            <div className="flex items-center justify-between px-4 py-2 gap-2">
              <h2 className="font-bold text-lg">Total</h2>
              <Currency value={totalPrice / 100} />
            </div>
            <SheetClose asChild>
              <Link href="/order">
                <Button className="w-full">Finalizar pedido</Button>
              </Link>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
