import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Orders() {
  const session = await getSession();
  console.log(session);
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
