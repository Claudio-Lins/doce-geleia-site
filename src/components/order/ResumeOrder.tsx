"use client";

import { SelectedProduct } from "@/@types";
import { useCartStore } from "@/hooks/useCartStore";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Currency from "../currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function ResumeOrder() {
  const router = useRouter();
  const [itemsSelected, setItemsSelected] = useState([] as SelectedProduct[]);
  const {
    showModalOrder,
    setShowModalOrder,
    infoClient,
    items,
    totalItems,
    totalWeight,
    subTotalPrice,
    removeItem,
    addItem,
  } = useCartStore();

  useEffect(() => {
    setItemsSelected(items);
    if (totalItems === 0) {
      toast.error("Seu carrinho está vazio");
      router.push("/products");
    }
  }, [items, router, totalItems]);

  return (
    <div className=" w-full flex-1 p-2 sm:max-w-6xl mt-20">
      <Table className="w-full text-sm text-zinc-950">
        <TableHeader className="bg-zinc-950">
          <TableRow>
            <TableHead className="text-left font-bold text-white">
              Produto
            </TableHead>
            <TableHead className="w-32 font-bold text-white">
              Quantidade
            </TableHead>
            <TableHead className="text-right font-bold w-32 text-white">
              Valor
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemsSelected?.map((item: SelectedProduct) => (
            <TableRow key={item.id}>
              <TableCell className="text-left">
                <div className="flex items-center text-xs md:text-base md:gap-2 md:py-2 ">
                  <div className="flex flex-col md:flex-row md:gap-2">
                    <span className="md:font-bold">{item.title}</span>
                    <span>{item.weight}gr </span>
                  </div>
                  {/* <span>
                    <Currency value={item.price / 100} />
                  </span> */}
                </div>
              </TableCell>
              <TableCell className="w-32">
                <div className="flex items-center justify-between gap-1">
                  <button onClick={() => removeItem(item.id, item.weight)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      addItem({
                        ...item,
                        quantity: 1,
                      })
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </TableCell>
              <TableCell className="text-right w-32">
                <Currency value={(item.price * item.quantity) / 100} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
