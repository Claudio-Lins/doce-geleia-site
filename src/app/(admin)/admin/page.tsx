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
    cache: "no-cache",
  }).then((res) => res.json());

  return data;
}

async function getTestimonials() {
  const data = await api("/testimonials", { cache: "no-cache" });
  const testimonials = await data.json();
  return testimonials;
}

export default async function AdminPage() {
  const order = await getOrders();
  const testimonial = await getTestimonials();
  // const products = await getAllProducts();

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
      <div className="flex items-center justify-center bg-pink-600 min-h-screen">
        <h1>Intruções</h1>
      </div>
  );
}
