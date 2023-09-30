"use client"
import React, { use, useEffect } from "react"
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
import { useCartStore } from "@/context/cartContext"
import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { useOrderStore } from "@/context/orderStore"
import { Product } from "@/@types"
import Link from "next/link"
import { toast } from "react-hot-toast"

interface SelectedProduct {
  id?: string
  title?: string
  coverUrl?: string
  productDetail?: {
    id: string
    weight: string
    price: number
    quantity: number
    productId: string
    createdAt: string
  }[]
}

export function Cart() {
  const { showCart, setShowCart, removeFromCart } = useCartStore()
  const { productSelected, remove } = useOrderStore()
  const pathName = usePathname()
  useEffect(() => {
    productSelected
  }, [productSelected])

  useEffect(() => {
    productSelected.length <= 0 && setShowCart(false)
  }, [productSelected.length, setShowCart])

  function handleRemove(id: string) {
    remove(id)
    toast.success("Produto removido do seu carrinho")
  }

  return (
    <div className="w-full">
      <Sheet onOpenChange={setShowCart} open={showCart}>
        <SheetTrigger>
          <div
            className={cn(
              " flex items-center gap-2 text-zinc-900",
              pathName === "/" ? "text-white" : "text-zinc-900",
              productSelected.length <= 0 ? "hidden" : "block"
            )}
          >
            <ShoppingCart
              strokeWidth={1.2}
              className={cn(
                "w-6 h-6 cursor-pointer font-light",
                pathName === "/" ? "text-white" : "text-zinc-900"
              )}
            />

            {/* <div
              className={cn(
                "w-6 h-6 cursor-pointer font-light",
                pathName === "/" ? "text-white" : "text-zinc-900",
                productSelected.length <= 0 ? "hidden" : "block"
              )}
            >
              {productSelected.length}
            </div> */}
          </div>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-none sm:w-[800px]">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when done.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <ScrollArea className="h-[calc(70vh)] pb-6">
            <div className="p-4">
              {productSelected.map((product: SelectedProduct) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={product.id}
                  >
                    <p>{product.title}</p>
                    <Button
                      onClick={() => handleRemove(product.id!)}
                      variant={"ghost"}
                    >
                      Remover
                    </Button>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
          <Separator className="mb-4" />
          <SheetFooter>
            <SheetClose asChild className="w-full">
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
