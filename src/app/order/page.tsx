"use client"
import { ProductSize } from "@/components/ProductSize"
import { FooterOrder } from "@/components/order/FooterOrder"
import { FormInfoClient } from "@/components/order/FormInfoClient"
import { Header } from "@/components/order/Header"
import { ProductsListaOrder } from "@/components/order/ProductsListaOrder"
import { Sidebar } from "@/components/order/Sidebar"
import { TableSelectedItems } from "@/components/order/TableSelectedItems"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useOrderStore } from "@/context/orderStore"
import Image from "next/image"
import { useEffect, useState } from "react"
import PhoneInput from "react-phone-input-2"
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
    <main className="mx-auto mt-28 flex w-full max-w-4xl flex-col sm:flex-row justify-start rounded-[32px] bg-white px-2 py-4 font-Montserrat shadow-md md:flex-row md:pl-4">
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
    </main>
  )
}
