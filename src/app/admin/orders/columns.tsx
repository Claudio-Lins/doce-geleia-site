"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  {
    accessorKey: "email",
    header: "Email",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Email
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(order.id)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(order.id)}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
