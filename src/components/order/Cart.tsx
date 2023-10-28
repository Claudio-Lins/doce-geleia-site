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
    packageWeight,
  } = useCartStore();

  const pathName = usePathname();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items, setShowCart]);

  useEffect(() => {
    setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0));
    setSubTotalPrice(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    );
    setTotalWeight(
      items.reduce(
        (acc, item) => acc + item.netWeight * item.quantity + packageWeight,
        0,
      ),
    );
    if (items.length === 0) {
      setShowCart(false);
    }
  }, [
    items,
    setShowCart,
    setTotalItems,
    setSubTotalPrice,
    setTotalWeight,
    packageWeight,
  ]);

  useShippingPriceCalculator(totalWeight);

  return (
    <div className={cn("", totalItems >= 1 ? "flex" : "hidden")}>
      <Sheet onOpenChange={setShowCart} open={showCart}>
        <SheetTrigger>
          <div
            className={cn(
              " flex items-center gap-2 text-zinc-900",
              pathName === "/" ? "text-white" : "text-zinc-900",
            )}
          >
            <div className="flex items-center gap-1">
              <ShoppingCart
                strokeWidth={1.2}
                className={cn(
                  "h-6 w-6 cursor-pointer font-light",
                  pathName === "/" ? "text-white" : "text-zinc-900",
                )}
              />
              {totalItems}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col justify-between">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span className="text-xl font-bold">Carrinho de compras</span>
              <ShoppingCart strokeWidth={1.5} />
            </SheetTitle>
            <Separator className="mt-8" />
          </SheetHeader>

          <ScrollArea className="flex-1 pb-6">
            <div className=" mt-4 flex flex-wrap justify-center gap-4">
              {items
                .sort((a, b) => a.weight - b.weight)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((item: SelectedProduct) => (
                  <div
                    className="flex w-full max-w-xs gap-2 rounded-lg border bg-white p-2 shadow-sm"
                    key={item.id}
                  >
                    <Image
                      src={item.coverUrl ?? "/logo/lg-site.svg"}
                      width={100}
                      height={100}
                      alt={item.title}
                      className="border-r bg-cover bg-center"
                    />
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex w-full flex-1 flex-col gap-2">
                        <p className=" w-full text-center font-bold leading-4">
                          {item.title}
                        </p>
                        <p className="w-full text-center text-xs font-bold">
                          {item.weight}gr
                        </p>
                      </div>
                      <div className="flex h-10 w-full items-center justify-center gap-2 border-t">
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
                  <TableCell className="text-lg font-bold">Total</TableCell>
                  <TableCell className="text-right text-lg font-bold">
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
