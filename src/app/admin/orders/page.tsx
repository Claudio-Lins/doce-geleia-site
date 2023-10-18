import { columns } from "./columns";
import { DataTable } from "./data-table";

// async function getData(): Promise<Payment[]> {
//   const response = await fetch("/api/order");
//   const data = await response.json();
//   return data;
// }

export default async function DemoPage() {
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
