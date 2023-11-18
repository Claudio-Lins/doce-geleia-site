interface SelectedProduct {
  id: string;
  title: string;
  weight: number;
  quantity: number;
}

interface EmailOrderPreperingProps {
  fullName: string;
  orderNumber: string;
  statusOrder: string;
}
import { CSSProperties } from 'react';

const containerStyles: CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "sans-serif",
  padding: "20px",
};

const contentStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
};

export function EmailOrderPrepering({
  fullName,
  orderNumber,
  statusOrder
}: EmailOrderPreperingProps) {
  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        <h1>Olá, {fullName}!</h1>
        <p>Recebemos o seu pedido com sucesso.</p>
        <p>Em breve entraremos em contacto consigo.</p>

        <p>Segue abaixo os detalhes do seu pedido.</p>
        <small>{orderNumber}</small>
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
              <th
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
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

          </tbody>
        </table>
        <h1>{ statusOrder}</h1>
      </div>
    </div>
  );
}
