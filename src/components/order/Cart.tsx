"use client"
import React from "react"
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
  const { showCart, setShowCart } = useCartStore()
  const { productSelected } = useOrderStore()
  const pathName = usePathname()
  return (
    <Sheet onOpenChange={setShowCart} open={showCart}>
      <SheetTrigger>
        <div
          className={cn(
            " flex items-center gap-2 text-zinc-900",
            pathName === "/" ? "text-white" : "text-zinc-900"
          )}
        >
          <ShoppingCart
            strokeWidth={1.2}
            className={cn(
              "w-6 h-6 cursor-pointer font-light",
              pathName === "/" ? "text-white" : "text-zinc-900",
              productSelected.length <= 0 ? "hidden" : "block"
            )}
          />
          <span>{productSelected.length}</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[800px]">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when done.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <ScrollArea className="h-[calc(70vh)] pb-6">
          <div className="p-4">
            {productSelected.map((product: SelectedProduct) => (
              <div key={product.id}>
                <p>{product.title}</p>
              </div>
            ))}
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
  )
}
