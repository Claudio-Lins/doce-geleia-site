"use client"
import { ProductSize } from "@/components/ProductSize"
import { FooterOrder } from "@/components/order/FooterOrder"
import { Header } from "@/components/order/Header"
import { ProductsListaOrder } from "@/components/order/ProductsListaOrder"
import { Sidebar } from "@/components/order/Sidebar"
import { Separator } from "@/components/ui/separator"
import { useOrderStore } from "@/context/orderStore"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function OrderPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  const { step, setStep } = useOrderStore()
  return (
    <main className="mx-auto mt-28 flex w-full max-w-6xl flex-col sm:flex-row justify-start rounded-[32px] bg-white px-2 py-4 font-Montserrat shadow-md md:flex-row md:pl-4">
      <Sidebar step={step} />
      <div className="w-full h-auto p-2 sm:p-10 flex flex-col justify-between ">
        <Header />
        <Separator className="my-2" />
        <section className="flex-1">
          {step === 1 && (
            <>
              <div className="w-full p-2 rounded-md border flex flex-col items-center">
                <strong className="text-lg font-extrabold">
                  Abacaxi com Pimenta Rosa
                </strong>
                <Separator className="my-2" />
                <div className="w-full p-2  flex items-center">
                  <div className="border-r">
                    <Image
                      src="/products/pimenta.png"
                      alt="Pimenta"
                      width={123 * 0.8}
                      height={110}
                      priority
                      className=" p-2"
                    />
                  </div>
                  <div className=" w-full flex items-center justify-between sm:justify-evenly px-4">
                    <ProductSize
                      price={250}
                      quantity={0}
                      weight="50gr"
                      setQuantity={function (quantity: number): void {
                        throw new Error("Function not implemented.")
                      }}
                    />
                    <Separator orientation="vertical" className="h-20" />
                    <ProductSize
                      price={400}
                      quantity={0}
                      weight="130gr"
                      setQuantity={function (quantity: number): void {
                        throw new Error("Function not implemented.")
                      }}
                    />
                    <Separator orientation="vertical" className="h-20" />
                    <ProductSize
                      price={550}
                      quantity={0}
                      weight="250gr"
                      setQuantity={function (quantity: number): void {
                        throw new Error("Function not implemented.")
                      }}
                    />
                  </div>
                </div>
              </div>
              <ProductsListaOrder products={products} />
            </>
          )}
        </section>
        <Separator className="my-2" />
        <FooterOrder />
      </div>
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
    </main>
  )
}
