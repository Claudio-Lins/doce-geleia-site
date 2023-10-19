import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Orders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (res) {
    res.setHeader("Cache-Control", "no-store");
  }

  const data = await prisma?.order.findMany({
    include: {
      selectedProducts: true,
    },
  });

  return (
    <div className="container mx-auto py-32">
      <DataTable
        columns={columns}
        data={
          data?.map((order) => ({
            ...order,
            date: new Date(order.createdAt).toLocaleDateString("pt-BR"),
            orderNumber: order.orderNumber,
            statusOrder: order.statusOrder,
            statusPayment: order.statusPayment,
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            totalAmount: order.totalAmount.toNumber(),
          })) || []
        }
      />
    </div>
  );
}
