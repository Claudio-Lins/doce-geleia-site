"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        <div className="flex flex-col gap-2">
          <div className="">
            <Dialog>
              <DialogTrigger>
                <EyeIcon className="h-5 w-5" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex flex-col gap-2">
                      <div className="text-lg font-medium">
                        {order.firstName} {order.lastName}
                      </div>
                      <div className="text-sm font-medium">{order.email}</div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <pre>{JSON.stringify(order, null, 2)}</pre>
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
