import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Orders() {

  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 1 },
  }).then((res) => res.json());

  const session = await getSession();
  if (session?.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
        <p>You are not authorized to view this page!</p>;
        {session?.role && <p>Your role is {session?.role}</p>}
        <Link
          href="/auth/login"
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto pt-20">
      <DataTable
        columns={columns}
        data={
          data?.map((order: any) => ({
            ...order,
            date: new Date(order.createdAt).toLocaleDateString("pt-BR"),
            orderNumber: order.orderNumber,
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
