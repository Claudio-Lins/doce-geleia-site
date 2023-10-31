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
    fetch(`http://localhost:3000/api/order/${session?.user.id}`)
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
    if (status === "DELIVERED") {
      return "Entregue";
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Historico de Pedidos</h1>
      <div className="mt-2 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Data</TableHead>
              <TableHead className="font-bold">orderNumber</TableHead>
              <TableHead className="font-bold">Valor</TableHead>
              <TableHead className="text-right font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderHistory.map((order: OrderHistoryProps) => (
              <TableRow key={order.id}>
                <TableHead className="w-[100px]">
                  {new Intl.DateTimeFormat("pt-PT", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }).format(new Date(order.createdAt))}
                </TableHead>
                <TableHead>{order.orderNumber}</TableHead>
                <TableHead>
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
                    )}
                  >
                    {statusOrder(order.statusOrder)}
                  </Badge>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <pre>
        <code>{JSON.stringify(orderHistory, null, 2)}</code>
      </pre> */}
    </div>
  );
}
