import { useOrderStore } from "@/context/orderStore"
import React from "react"

export function Header() {
  const { step } = useOrderStore()
  return (
    <header>
      {step === 1 && (
        <div className="">
          <h2 className="text-2xl font-bold">Escolher produtos</h2>
          <span className="text-gray-500">
            Escolha os produtos que você deseja comprar
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="">
          <h2 className="text-2xl font-bold">Informções pessoais</h2>
          <span className="text-gray-500">
            Preencha seu nome, email, telemóvel e morada
          </span>
        </div>
      )}
      {step === 3 && (
        <div className="">
          <h2 className="text-2xl font-bold">Verifique seu pedido</h2>
          <span className="text-gray-500">
            Caso esteja ok, clique em enviar
          </span>
        </div>
      )}
    </header>
  )
}
