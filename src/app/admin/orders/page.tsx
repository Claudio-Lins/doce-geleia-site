import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Orders() {
  // const data = await prisma?.order.findMany({
  //   include: {
  //     selectedProducts: true,
  //   },
  // });

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  }).then((res) => res.json());

  return (
    <div className="container mx-auto py-32">
      <DataTable
        columns={columns}
        data={
          data?.map((order: any) => ({
            ...order,
            date: new Date(order.createdAt).toLocaleDateString("pt-BR"),
            orderNumber: order.orderNumber,
            statusOrder: order.statusOrder,
            statusPayment: order.statusPayment,
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            totalAmount: order.totalAmount,
          })) || []
        }
      />
    </div>
  );
}
