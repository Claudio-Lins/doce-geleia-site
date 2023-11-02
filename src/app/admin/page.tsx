import { AdminContent } from "@/components/admin/AdminContent";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/session";
import Link from "next/link";

async function getOrders() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
}

export default async function AdminPage() {
  const order = await getOrders();
  console.log(order);
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
    <div className="mx-auto mb-20 mt-28 w-full max-w-6xl overflow-hidden border-t p-4 shadow-sm md:rounded-xl md:border">
      <div className="grid grid-cols-appMobile md:grid-cols-app ">
        <SidebarAdmin />
        <div className="p-4 md:p-10">
          <AdminContent order={order} />
        </div>
      </div>
    </div>
  );
}
