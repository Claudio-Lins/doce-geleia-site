import * as React from "react"
import Currency from "../currency"

interface SelectedProduct {
  id: string
  title: string
  size: string
  quantity: number
}

interface EmailContactProps {
  firstName: string
  lastName: string
  email: string
  totalItems: number
  products: SelectedProduct[]
}

export function EmailOrder({
  firstName,
  lastName,
  totalItems,
  email,
  products,
}: EmailContactProps) {
  return (
    <div>
      <h1>
        Olá, {firstName} {lastName}!
      </h1>
      <p>Obrigado ....!</p>

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
      </table>
      <table
        style={{
          width: "100%",
          textAlign: "left",
          borderCollapse: "collapse",
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#e0dfdf",
        }}
      >
        <tr style={{ backgroundColor: "#000000" }}>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              color: "#fff",
            }}
          >
            Total Items
          </td>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              textAlign: "right",
            }}
          >
            {totalItems}
          </td>
        </tr>
        <tr>
          <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            Shipping
          </td>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              textAlign: "right",
            }}
          >
            shipping
          </td>
        </tr>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            Subtotal
          </td>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              textAlign: "right",
            }}
          >
            subtotal
          </td>
        </tr>
        <tr>
          <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            Total
          </td>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              textAlign: "right",
            }}
          >
            total
          </td>
        </tr>
      </table>
    </div>
  )
}
