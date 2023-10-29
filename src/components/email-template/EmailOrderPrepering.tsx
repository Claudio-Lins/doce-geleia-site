interface SelectedProduct {
  id: string;
  title: string;
  weight: number;
  quantity: number;
}

interface EmailOrderPreperingProps {
  fullName: string;
  email: string;
  orderNumber: string;
  // products: SelectedProduct[];
}

export function EmailOrderPrepering({
  fullName,
  orderNumber,
}: EmailOrderPreperingProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Olá, {fullName}!
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Obrigado por comprar na nossa loja!
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Seu pedido {orderNumber} está sendo preparado.
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Já estamos preparando seu pedido!
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Você receberá um email de confirmação assim que seu pedido for
          enviado.
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Enquanto isso, você pode acompanhar o status do seu pedido na sua
          conta.
        </p>
        <hr
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#ddd",
            border: "none",
            margin: "20px 0",
          }}
        />
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Obrigado pela preferência!
        </p>
      </div>
    </div>
  );
}
