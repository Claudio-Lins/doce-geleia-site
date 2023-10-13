"use client";
import { SelectedProduct } from "@/@types";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils";
import { useShippingPriceCalculator } from "@/utils/useShippingPriceCalculator";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Currency from "../currency";
import { BtnToggleShip } from "../shipping/BtnToggleShip";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

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
    totalShippingPrice,
    shippingPrice,
    setTotalWeight,
    totalWeight,
    isPickup,
    freeShipping,
  } = useCartStore();

  const pathName = usePathname();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items, setShowCart]);

  useEffect(() => {
    setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0));
    setSubTotalPrice(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    setTotalWeight(
      items.reduce((acc, item) => acc + item.weight * item.quantity, 0)
    );
    if (items.length === 0) {
      setShowCart(false);
    }
  }, [items, setShowCart, setTotalItems, setSubTotalPrice, setTotalWeight]);

  useShippingPriceCalculator(totalWeight);

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
        <SheetContent className="w-full flex flex-col justify-between">
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
                    className="border w-full flex max-w-xs p-2 rounded-lg bg-white shadow-sm gap-2"
                    key={item.id}
                  >
                    <Image
                      src={item.coverUrl ?? "/logo/lg-site.svg"}
                      width={100}
                      height={100}
                      alt={item.title}
                      className="bg-cover bg-center border-r"
                    />
                    <div className="flex flex-col w-full justify-between">
                      <div className="w-full flex flex-col flex-1 gap-2">
                        <p className=" leading-4 font-bold text-center w-full">
                          {item.title}
                        </p>
                        <p className="w-full text-center text-xs font-bold">
                          {item.weight}gr
                        </p>
                      </div>
                      <div className="flex w-full h-10 border-t justify-center gap-2 items-center">
                        <button
                          onClick={() => removeItem(item.id, item.weight)}
                        >
                          <MinusCircle />
                        </button>
                        <p className="w-6 text-center">{item.quantity}</p>
                        <button
                          onClick={() =>
                            addItem({
                              ...item,
                              price: item.price,
                              weight: item.weight,
                            })
                          }
                        >
                          <PlusCircle />
                        </button>
                      </div>
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
                <TableRow className="">
                  <TableCell className=" w-[240px]">
                    <BtnToggleShip />
                  </TableCell>
                  <TableCell className="text-right">
                    <span>{totalWeight}gr</span>
                    <Currency value={isPickup ? 0 : shippingPrice} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold text-lg">Total</TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    <Currency
                      value={
                        isPickup
                          ? subTotalPrice / 100
                          : subTotalPrice / 100 + shippingPrice
                      }
                    />
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
  );
}
