"use client"
import { InfoClient, SelectedProduct } from "@/@types"
import { useCartStore } from "@/hooks/useCartStore"
import Image from "next/image"
import { MouseEvent, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Mail, Printer } from "lucide-react"
import { z } from "zod"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EmailOrderSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  products: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      // coverUrl: z.string(),
      // price: z.number(),
      // weight: z.number(),
      size: z.string(),
      quantity: z.number(),
    })
  ),
})

export type EmailContactProps = z.infer<typeof EmailOrderSchema>

export function FooterCheckout() {
  const [client, setClient] = useState({} as InfoClient)
  const [itemsSelected, setItemsSelected] = useState([] as SelectedProduct[])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const {
    showModalOrder,
    setShowModalOrder,
    infoClient,
    items,
    totalItems,
    totalWeight,
    subTotalPrice,
    shippingPrice,
    removeItem,
    addItem,
    resetLocalStorage,
  } = useCartStore()

  useEffect(() => {
    setItemsSelected(items)
  }, [items])

  useEffect(() => {
    setClient(infoClient)
  }, [infoClient])

  useEffect(() => {
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email)
    itemsSelected.map((item) => {
      const products = {
        id: item.id,
        title: item.title,
        // coverUrl: item.coverUrl,
        // price: item.price,
        // weight: item.weight,
        size: item.size,
        quantity: item.quantity,
      }
      return products
    })
  }, [client, itemsSelected])

  async function sendEmail(data: EmailContactProps) {
    const response = await fetch("/api/email-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      alert("Email sent!")
      // resetLocalStorage()
    } else {
      alert("Something went wrong!")
    }
  }

  return (
    <div className="py-4 border-t-4">
      <div className="flex flex-col w-full">
        <div className="flex items-center flex-col sm:flex-row w-full gap-2">
          <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
            <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
              Dados de entrega
            </h3>
            <strong>{client.firstName}</strong>
            <strong> {client.lastName}</strong>
            <br />
            <span>{client.email} - </span>
            <span>{client.phone}</span>
            <p>{client.address}</p>
            <span>{client.city} - </span>
            <span>{client.postalCode}</span>
            <hr className="my-1" />
            <small>Nota</small>
            <p>{client.observations}</p>
          </div>

          <div className="mt-4 rounded-lg border-[1px] p-2 text-xs text-gray-500 md:w-1/2 h-40">
            <h3 className="mb-2 border-b font-bold text-lg text-gray-500">
              Dados de pagamento
            </h3>
            <div className="w-full rounded-lg p-2 flex flex-col justify-center items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={"/assets/mbway_logo.svg"}
                  alt="MBWay"
                  width={60}
                  height={30}
                />
                <strong className="text-lg text-zinc-900">910 344 904</strong>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/assets/activoBank.png"}
                  alt="MBWay"
                  width={120}
                  height={40}
                />
                <strong className=" text-zinc-900">
                  IBAN PT50 0002 0123 1234 5678 9015 4
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-10 w-full print:hidden">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-1/2 flex items-center gap-2 text-zinc-50 bg-red-500"
          )}
        >
          <span>Cancelar</span>
        </Link>

        <Button
          onClick={() => window.print()}
          className="w-1/2 bg-gradient-to-tr from-zinc-500 to-zinc-700 flex items-center gap-2 text-white"
          type="submit"
        >
          <span>Imprimir</span>
          <Printer size={16} />
        </Button>

        <Button
          onClick={() =>
            sendEmail({
              firstName,
              lastName,
              email,
              products: itemsSelected,
            })
          }
          className="w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center gap-2 text-white"
          type="button"
        >
          <span>Enviar</span>
          <Mail size={16} />
        </Button>
      </div>
    </div>
  )
}
