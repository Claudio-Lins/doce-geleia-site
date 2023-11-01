"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Currency from "../currency";
import { ScrollArea } from "../ui/scroll-area";

interface OrderHistoryProps {
  id: string;
  orderNumber: number;
  createdAt: Date;
  totalAmount: number;
  statusOrder: string;
}

export function OrderHistory() {
  const { data: session } = useSession();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetch(`/api/order/${session?.user.id}`)
      .then((response) => response.json())
      .then((data) => setOrderHistory(data));
  }, [session]);

  function statusOrder(status: string) {
    if (status === "PENDING") {
      return "Pendente";
    }
    if (status === "PREPERING") {
      return "Preparando";
    }
    if (status === "CANCELED") {
      return "Cancelado";
    }
    if (status === "SHIPPED") {
      return "Enviado";
    }
    if (status === "DELIVERED") {
      return "Entregue";
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Historico de Pedidos</h1>
      <div className="mt-2 hidden w-full md:block">
        <Table>
          <TableHeader className="text-zinc-950">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-zinc-950">
                Data
              </TableHead>
              <TableHead className=" font-bold text-zinc-950">
                orderNumber
              </TableHead>
              <TableHead className="font-bold text-zinc-950">Valor</TableHead>
              <TableHead className="text-right font-bold text-zinc-950">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <Table>
          <ScrollArea className="h-full w-full max-w-none">
            <TableBody className="w-full max-w-none">
              {orderHistory.map((order: OrderHistoryProps) => (
                <TableRow key={order.id}>
                  <TableHead className="w-[100px]">
                    {new Intl.DateTimeFormat("pt-PT", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }).format(new Date(order.createdAt))}
                  </TableHead>
                  <TableHead className="">{order.orderNumber}</TableHead>
                  <TableHead className="">
                    <Currency value={order.totalAmount} />
                  </TableHead>
                  <TableHead className="text-right">
                    <Badge
                      variant="default"
                      className={cn(
                        order.statusOrder === "PENDING" &&
                          "bg-orange-500 text-orange-100",
                        order.statusOrder === "PREPERING" &&
                          "bg-blue-500 text-blue-100",
                        order.statusOrder === "CANCELED" &&
                          "bg-red-600 text-red-100",
                        order.statusOrder === "DELIVERED" &&
                          "bg-green-600 text-green-100",
                        order.statusOrder === "SHIPPED" &&
                          "bg-zinc-900 text-zinc-50",
                      )}
                    >
                      {statusOrder(order.statusOrder)}
                    </Badge>
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </ScrollArea>
        </Table>
      </div>
      <div className="mt-2 w-full md:hidden">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="w-[100px] py-2 text-left font-bold text-zinc-950">
                Data
              </th>
              <th className="py-2 text-right font-bold text-zinc-950">
                Status
              </th>
            </tr>
          </thead>
        </table>
        <table className="w-full">
          <ScrollArea className="h-full w-full max-w-none">
            <tbody>
              {orderHistory.map((order: OrderHistoryProps) => (
                <tr
                  key={order.id}
                  className="transition-colors duration-200 ease-in-out hover:bg-gray-100"
                >
                  <td className="w-[100px] py-2">
                    {new Intl.DateTimeFormat("pt-PT", {
                      month: "numeric",
                      day: "numeric",
                    }).format(new Date(order.createdAt))}
                  </td>
                  <td className="py-2 text-right">
                    <Badge
                      variant="default"
                      className={cn(
                        order.statusOrder === "PENDING" &&
                          "bg-orange-500 text-orange-100",
                        order.statusOrder === "PREPERING" &&
                          "bg-blue-500 text-blue-100",
                        order.statusOrder === "CANCELED" &&
                          "bg-red-600 text-red-100",
                        order.statusOrder === "DELIVERED" &&
                          "bg-green-600 text-green-100",
                        order.statusOrder === "SHIPPED" &&
                          "bg-zinc-900 text-zinc-50",
                      )}
                    >
                      {statusOrder(order.statusOrder)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </ScrollArea>
        </table>
      </div>
    </div>
  );
}
