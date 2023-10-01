"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
  const { showCart, setShowCart, removeFromCart } = useCartStore()
  const [hasProductSelected, setHasProductSelected] = useState<boolean>(false)
  const { productSelected, remove, addOrderDetails, orderDetails } =
    useOrderStore()
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

  function handleAddToCart() {
    const orderDetails: OrderDetails = {
      id: productSelected[0]?.id,
      title: productSelected[0]?.title,
      coverUrl: productSelected[0]?.coverUrl,
      productDetail: productSelected[0]?.productDetail,
    }
    addOrderDetails(orderDetails)
    toast.success("Produto adicionado ao seu carrinho")
  }

  return (
    <div className="w-full">
      <Sheet onOpenChange={setShowCart} open={showCart}>
        <SheetTrigger>
          <div
            className={cn(
              " flex items-center gap-2 text-zinc-900",
              pathName === "/" ? "text-white" : "text-zinc-900",
              hasProductSelected ? "hidden" : "block"
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
          <Separator className="my-8" />
          <Table className="overflow-hidden rounded-t-lg">
            <TableHeader className="bg-zinc-950 text-white rounded-t-lg overflow-hidden">
              <TableRow>
                <TableHead className="w-64 text-white">Sabor</TableHead>
                <TableHead>
                  <div className="flex flex-col items-center w-20 text-white">
                    <div className="text-xs">50gr</div>
                    <div className="text-xs font-bold">2,50€</div>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex flex-col items-center w-20 text-white">
                    <div className="text-xs">130gr</div>
                    <div className="text-xs font-bold">4,00€</div>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex flex-col items-center w-20 text-white">
                    <div className="text-xs">250gr</div>
                    <div className="text-xs font-bold">5,00€</div>
                  </div>
                </TableHead>
                <TableHead className="w-24  text-white">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-[calc(60vh)] pb-6">
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
