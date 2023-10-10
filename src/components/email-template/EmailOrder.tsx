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
      <h2>Detalhes do Pedido</h2>
      <table
        style={{
          width: "100%",
          textAlign: "left",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
              Produtos
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Tamanho
            </th>
            <th
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Quantidade
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              style={{ backgroundColor: index % 2 ? "#f2f2f2" : "#fff" }}
            >
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {product.title}
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {product.size}
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <td style={{ padding: "10px", borderTop: "1px solid #ddd" }}>
              Total
            </td>
            <td
              style={{
                padding: "10px",
                borderTop: "1px solid #ddd",
                textAlign: "center",
              }}
            ></td>
            <td
              style={{
                padding: "10px",
                borderTop: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              {products.reduce((acc, product) => {
                return acc + product.quantity
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
