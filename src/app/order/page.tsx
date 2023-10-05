"use client"

import { FooterOrder } from "@/components/order/FooterOrder"
import { FormInfoClient } from "@/components/order/FormInfoClient"
import { Header } from "@/components/order/Header"
import { Sidebar } from "@/components/order/Sidebar"
import { TableSelectedItems } from "@/components/order/TableSelectedItems"
import { Separator } from "@/components/ui/separator"
import { useOrderStore } from "@/context/orderStore"
import { useEffect, useState } from "react"
import "react-phone-input-2/lib/bootstrap.css"

export default function OrderPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  const { step, setStep } = useOrderStore()
  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto flex w-full max-w-[950px] flex-col items-center rounded-[32px] bg-white px-2 py-4 font-Montserrat shadow-md md:flex-row md:pl-4">
        <Sidebar step={step} />
        <div className="w-full h-auto p-2 sm:p-10 flex flex-col justify-between ">
          <Header />
          <Separator className="my-2" />
          <section className="flex-1">
            {step === 1 && <FormInfoClient />}
            {step === 2 && <TableSelectedItems />}
          </section>
          <Separator className="my-2" />
          <FooterOrder />
        </div>
        {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      </div>
    </div>
  )
}
