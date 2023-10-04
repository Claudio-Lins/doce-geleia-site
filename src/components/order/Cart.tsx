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
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

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
    subTotalPrice,
    setSubTotalPrice,
    setShippingPrice,
    shippingPrice,
  } = useCartStore()

  const pathName = usePathname()

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items, setShowCart])

  useEffect(() => {
    setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0))
    setSubTotalPrice(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
    if (items.length === 0) {
      setShowCart(false)
    }
  }, [items, setShowCart, setTotalItems, setSubTotalPrice])

  return (
    <div className={cn("", totalItems >= 1 ? "flex" : "hidden")}>
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
        <SheetContent className="w-full flex flex-col justify-between sm:max-w-none sm:w-[800px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span className="text-xl font-bold">Carrinho de compras</span>
              <ShoppingCart strokeWidth={1.5} />
            </SheetTitle>
            <Separator className="mt-8" />
          </SheetHeader>

          <ScrollArea className="flex-1 pb-6">
            <div className=" flex flex-wrap gap-4 justify-center mt-4">
              {items
                .sort((a, b) => a.weight - b.weight)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item: SelectedProduct) => (
                  <div
                    className="border flex flex-col w-36 p-2 rounded-lg justify-between bg-white shadow-sm gap-2"
                    key={item.id}
                  >
                    <div className="flex flex-col">
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
                      <p className="w-full text-center text-xs font-bold">
                        {item.size}
                      </p>
                    </div>
                    <div className="flex w-full h-10 border-t justify-center gap-2 items-center">
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
          <Separator />
          <div className="flex flex-col">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Sub-total</TableCell>
                  <TableCell className="text-right">
                    <Currency value={subTotalPrice / 100} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Frete</TableCell>
                  <TableCell className="text-right">
                    <Currency value={shippingPrice} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-lg">Total</TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    <Currency value={subTotalPrice / 100 + shippingPrice} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <SheetClose asChild>
              <Link href="/order">
                <Button className="w-full">Finalizar pedido</Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
