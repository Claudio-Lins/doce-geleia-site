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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { z } from "zod";

const orderSchema = z.object({
  id: z.string(),
  date: z.string(),
  orderNumber: z.string(),
  statusOrder: z.enum(["PENDING", "PREPERING", "CANCELED", "DELIVERED"]),
  statusPayment: z.enum(["PENDING", "PAID", "CANCELED"]),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
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
    })
  ),
});

export type Order = z.infer<typeof orderSchema>;

export const columns: ColumnDef<Order>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "orderNumber",
    header: "#",
  },
  {
    accessorKey: "statusOrder",
    header: "Status",
  },
  {
    accessorKey: "statusPayment",
    header: "Pagamento",
  },
  {
    accessorKey: "firstName",
    header: "Name",
  },
  {
    accessorKey: "lastName",
    header: "Apelido",
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  // {
  //   accessorKey: "postalCode",
  //   header: "Código Postal",
  // },
  // {
  //   accessorKey: "address",
  //   header: "Modada",
  // },
  // {
  //   accessorKey: "city",
  //   header: "Cidade",
  // },
  // {
  //   accessorKey: "country",
  //   header: "País",
  // },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Total</div>,
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
              <DialogContent className="h-[calc(90vh)] max-w-none md:max-w-4xl w-full">
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex items-center">
                      <div className="flex flex-col gap-0">
                        <div className="text-lg font-medium">
                          {order.firstName} {order.lastName}
                        </div>
                        <div className="text-sm font-medium">
                          Pedido #:{order.orderNumber}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className={cn("text-sm font-medium")}>
                          {order.statusOrder}
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
                            <TableHead>Produto</TableHead>
                            <TableHead>Peso</TableHead>
                            <TableHead className="text-right">
                              Quantidade
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.selectedProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.title}</TableCell>
                              <TableCell>{product.weight}gr</TableCell>
                              <TableCell className="text-right">
                                {product.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
