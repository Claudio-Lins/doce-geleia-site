import { useCartStore } from "@/hooks/useCartStore";
import { useOrderStore } from "@/hooks/useOrderStore";
import { z } from "zod";

const orderSchema = z.object({
  orderNumber: z.string(),
  statusPayment: z.enum(["PENDING", "PAID", "CANCELED"]),
  statusOrder: z.enum(["PENDING", "PREPERING", "CANCELED", "DELIVERED"]),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  postalCode: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  totalAmount: z.number(),
  complement: z.string(),
  observations: z.string(),
  delivered: z.boolean(),
  selectedProducts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      coverUrl: z.string(),
      price: z.number(),
      weight: z.number(),
      netWeight: z.number(),
      quantity: z.number(),
    })
  ),
});

type OrderData = z.infer<typeof orderSchema>;

export function useCreateOrder() {
  const { order, setOrder } = useOrderStore();
  const { items, infoClient, orderNumber, totalShippingPrice } = useCartStore();

  async function handleFormOrder() {
    const order: OrderData = {
      ...infoClient,
      selectedProducts: items,
      orderNumber: orderNumber,
      statusPayment: "PENDING",
      statusOrder: "PENDING",
      // totalAmount + totalShippingPrice
      totalAmount: items.reduce((acc, item) => {
        return acc + (item.price * item.quantity) / 100;
      }, totalShippingPrice),
      delivered: false,
    };
    localStorage.setItem("order", JSON.stringify(order));
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }

  return { order, setOrder, handleFormOrder };
}
