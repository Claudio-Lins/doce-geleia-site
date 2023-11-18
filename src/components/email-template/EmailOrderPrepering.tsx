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
  width: "50%",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  fontFamily: "sans-serif",
  padding: "20px",
  margin: "20px auto",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.15)",
  border: "1px solid #ddd",
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
        <p>Seu pedido # {orderNumber} está em <b>{ statusOrder}</b>.</p>
        <p>Em breve entraremos em contacto consigo.</p>
      </div>
    </div>
  );
}
