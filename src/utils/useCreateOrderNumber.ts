export function createOrderNumber(): string {
  const prefixo: string = "DC-";
  const timestamp: string = Date.now().toString();
  const timestampNumber: string = timestamp;
  const orderNumber: string = prefixo + timestampNumber;

  return orderNumber;
}
