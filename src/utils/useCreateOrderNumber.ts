export function createOrderNumber(): string {
  const prefixo: string = "DC-";
  const timestamp: string = Date.now().toString(); // Obtém o timestamp atual e o converte em uma string
  const timestampNumber: string =
    timestamp.slice(-6, -3) + " " + timestamp.slice(-3);
  const orderNumber: string = prefixo + timestampNumber; // Combina o prefixo e os dígitos do timestamp

  return orderNumber;
}
