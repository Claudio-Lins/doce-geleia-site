"use client"
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ScrollArea } from "../ui/scroll-area"
import { useCartStore } from "@/hooks/useCartStore"
import { SelectedProduct } from "@/@types"
import Image from "next/image"
import Currency from "../currency"

export function TableSelectedItems() {
  const { items, totalItems } = useCartStore()
  return (
    <Table className="px-2">
      <ScrollArea className="h-[400px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] font-bold text-black">
              Produto
            </TableHead>
            <TableHead className="font-bold text-black">Tamanho</TableHead>
            <TableHead className="font-bold text-black">Quntidade</TableHead>
            <TableHead className="text-right font-bold text-black">
              SubTotal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-bold">{item.title}</TableCell>
              <TableCell className="text-center">{item.size}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">
                <Currency value={(item.quantity * item.price) / 100} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  )
}
