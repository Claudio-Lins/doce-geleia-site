"use client"

import { useCartStore } from "@/hooks/useCartStore"
import Currency from "../currency"
import { SelectedProduct } from "@/@types"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Minus, Plus } from "lucide-react"

export function ResumeOrder() {
  const [itemsSelected, setItemsSelected] = useState([] as SelectedProduct[])
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
  } = useCartStore()

  useEffect(() => {
    setItemsSelected(items)
  }, [items])

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
              Sub-total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemsSelected?.map((item: SelectedProduct) => (
            <TableRow key={item.id}>
              <TableCell className="text-left">
                <div className="flex items-center gap-2 py-2 font-bold">
                  {/* <Image
                    src={item.coverUrl ?? ""}
                    alt={item.title}
                    width={30}
                    height={30}
                  /> */}
                  <span>{item.title}</span>
                  <span>{item.size}</span>
                </div>
              </TableCell>
              <TableCell className="w-32">
                <div className="flex items-center justify-between gap-1">
                  <button onClick={() => removeItem(item.id, item.size)}>
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
  )
}
