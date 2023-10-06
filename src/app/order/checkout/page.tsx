"use client"
import { useCartStore } from "@/hooks/useCartStore"
import { useEffect, useState } from "react"

export default function Checkout() {
  const { infoClient } = useCartStore()

  return (
    <div className="w-full max-w-5xl mx-auto fixed inset-0 bg-red-400 flex flex-col justify-center">
      <header>
        <h1 className="text-3xl text-center">Checkout</h1>
        <span>
          Resumo da compra de {infoClient.firstName} {infoClient.lastName}
        </span>
      </header>
    </div>
  )
}
