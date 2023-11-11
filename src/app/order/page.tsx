"use client";
import { FooterOrder } from "@/components/order/FooterOrder";
import { FormInfoClient } from "@/components/order/FormInfoClient";
import { Header } from "@/components/order/Header";
import { Sidebar } from "@/components/order/Sidebar";
import { TableSelectedItems } from "@/components/order/TableSelectedItems";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/hooks/useCartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/bootstrap.css";

export default function OrderPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) router.push("/auth/login");
  }, [router, session]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const { step, setStep } = useCartStore();

  return (
    <div className="flex items-center pb-12 pt-24 sm:min-h-screen">
      <div className="font-Montserrat mx-auto flex w-full max-w-[950px] flex-col items-center rounded-[32px] bg-white px-2 py-4 shadow-md md:flex-row md:pl-4">
        <Sidebar step={step} />
        <div className="flex h-auto w-full flex-col justify-between p-2 sm:p-10 ">
          <Header />
          <Separator className="my-2" />
          <section className="flex-1">
            {step === 1 && <FormInfoClient />}
            {step === 2 && <TableSelectedItems />}
          </section>
          <Separator className="my-2" />
          <FooterOrder />
        </div>
      </div>
    </div>
  );
}
