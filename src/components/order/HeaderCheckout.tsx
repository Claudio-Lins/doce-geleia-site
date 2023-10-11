"use client"

import { InfoClient, SelectedProduct } from "@/@types"
import { useCartStore } from "@/hooks/useCartStore"
import { useEffect, useState } from "react"
import Currency from "../currency"

export function HeaderCheckout() {
  const [client, setClient] = useState({} as InfoClient)
  const [itemsSelected, setItemsSelected] = useState([] as SelectedProduct[])
  const [isPortugal, setIsPortugal] = useState(false)
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
  } = useCartStore()

  useEffect(() => {
    setItemsSelected(items)
    setClient(infoClient)
  }, [items, infoClient])

  useEffect(() => {
    if (infoClient && infoClient?.phone.slice(0, 3) === "351") {
      setIsPortugal(true)
    } else {
      setIsPortugal(false)
    }
  }, [infoClient])

  return (
    <header className="border-b pb-2 fixed w-full max-w-6xl bg-white z-10 ">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-bold ">
            {client?.firstName} {client.lastName},
          </h1>
          <span>Resumo da compra</span>
        </div>
        <div className="flex items-center gap-4">
          {isPortugal ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Frete:</span>
              <strong className="">
                <Currency value={shippingPrice} />
              </strong>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Frete:</span>
              <strong className="">Consultar</strong>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Subtotal</span>
            <strong className="text-2xl">
              <Currency value={subTotalPrice / 100} />
            </strong>
          </div>
        </div>
      </div>
    </header>
  )
}
