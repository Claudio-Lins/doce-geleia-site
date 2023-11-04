import { AdminContent } from "@/components/admin/AdminContent";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
import { buttonVariants } from "@/components/ui/button";
import { api } from "@/lib/api";
import { getSession } from "@/lib/session";
import Link from "next/link";

async function getOrders() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 1,
    },
  }).then((res) => res.json());

  return data;
}

async function getTestimonials() {
  const data = await api("/testimonials", { next: { revalidate: 1 } });
  const testimonials = await data.json();
  return testimonials;
}

export default async function AdminPage() {
  const order = await getOrders();
  const testimonial = await getTestimonials();

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
        <div className="p-4 md:p-4">
          <AdminContent order={order} testimonial={testimonial} />
        </div>
      </div>
    </div>
  );
}
