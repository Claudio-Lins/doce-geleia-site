import { OrderProps } from "@/@types";
import { columns } from "@/app/admin/orders/columns";
import { DataTable } from "@/app/admin/orders/data-table";

interface AdminOrdersProps {
  order: OrderProps[];
}

export async function AdminOrders({ order }: AdminOrdersProps) {
  return (
    <div className="">
      <DataTable
        columns={columns}
        data={
          order?.map((order: any) => ({
            ...order,
            date: new Date(order.createdAt).toLocaleDateString("pt-BR"),
            orderNumber: order.orderNumber.slice(8),
            statusOrder: order.statusOrder,
            statusPayment: order.statusPayment,
            fullName: order.fullName,
            email: order.email,
            totalAmount: order.totalAmount,
            selectedProducts: order.selectedProducts,
          })) || []
        }
      />
    </div>
  );
}
