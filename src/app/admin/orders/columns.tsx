"use client";

import { DataPickupShip } from "@/components/order/DataPickupShip";
import { FormStatus } from "@/components/order/FormStatus";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { z } from "zod";

const orderSchema = z.object({
  id: z.string(),
  date: z.string(),
  orderNumber: z.string(),
  statusOrder: z.enum([
    "PENDING",
    "PREPERING",
    "CANCELED",
    "SHIPPED",
    "DELIVERED",
  ]),
  statusPayment: z.enum(["PENDING", "PAID", "CANCELED"]),
  fullName: z.string().min(3),
  phone: z.string(),
  postalCode: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  totalAmount: z.number(),
  email: z.string(),
  complement: z.string(),
  observations: z.string(),
  delivered: z.boolean(),
  selectedProducts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      weight: z.number(),
      coverUrl: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
});

export type Order = z.infer<typeof orderSchema>;

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-left text-sm">Data</div>,
  },
  {
    accessorKey: "orderNumber",
    header: () => <div className="text-left text-sm"># Pedido</div>,
  },
  {
    accessorKey: "statusOrder",
    header: () => <div className="text-left text-sm">Status</div>,
  },
  {
    accessorKey: "statusPayment",
    header: () => <div className="text-left text-sm">Pagamento</div>,
  },
  {
    accessorKey: "fullName",
    header: () => <div className="text-left text-sm">Cliente</div>,
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right text-sm">Total</div>,
    cell: ({ row }) => {
      const totalAmount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(totalAmount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-col gap-2">
          <div className="">
            <Dialog>
              <DialogTrigger>
                <EyeIcon className="h-5 w-5" />
              </DialogTrigger>
              <DialogContent className="h-[calc(90vh)] w-full max-w-none md:max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0">
                        <div className="text-sm font-medium">
                          {order.fullName}
                        </div>
                        <div className="text-sm font-medium">
                          Pedido #:{order.orderNumber}
                        </div>
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </DialogTitle>
                  <DialogDescription>
                    <div className="">
                      <FormStatus order={order} />
                    </div>
                    <div className="">
                      <DataPickupShip />
                    </div>
                    <div className="mt-4">
                      <Table className="w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-2/3">Produto</TableHead>
                            <TableHead className="w-1/3">Peso</TableHead>
                            <TableHead className="w-1/3">Quantidade</TableHead>
                          </TableRow>
                        </TableHeader>
                      </Table>
                      <ScrollArea className="h-40 w-full overflow-hidden">
                        <Table className="">
                          <TableBody>
                            {order.selectedProducts.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell className="text-left">
                                  {product.title}
                                </TableCell>
                                <TableCell className="">
                                  {product.weight}gr
                                </TableCell>
                                <TableCell className="">
                                  {product.quantity}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      );
    },
  },
];
