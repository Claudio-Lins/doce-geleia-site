import * as React from "react"
import Currency from "../currency"

interface SelectedProduct {
  id: string
  title: string
  // coverUrl?: string
  // price: number
  // weight: number
  size: string
  quantity: number
}

interface EmailContactProps {
  firstName: string
  lastName: string
  email: string
  // phone: string
  // postalCode: string
  // address: string
  // city: string
  // complement: string
  // observations: string
  products: SelectedProduct[]
}

export function EmailOrder({
  firstName,
  lastName,
  email,
  products,
}: EmailContactProps) {
  return (
    <div>
      <h1>
        Olá, {firstName} {lastName}!
      </h1>
      <p>Obrigado ....!</p>
      <p>Segue detalhes do seu pedido...</p>
      <p>Here is a summary of your order:</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title}-{product.size} x {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}
