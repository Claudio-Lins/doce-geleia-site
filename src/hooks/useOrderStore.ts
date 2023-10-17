import { OrderProps } from "@/@types";
import { create } from "zustand";

interface OrderStore {
  order: OrderProps;
  setOrder: (order: OrderProps) => void;
}
export const useOrderStore = create<OrderStore>((set, get) => {
  let initialOrder: OrderProps = {
    orderNumber: "",
    statusPayment: "PENDING",
    statusOrder: "PENDING",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    address: "",
    city: "",
    country: "",
    complement: "  ",
    observations: "  ",
    totalAmount: 0,
    delivered: false,
    selectedProduct: [],
  };
  if (typeof window !== "undefined") {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      initialOrder = JSON.parse(storedOrder);
    }
  }

  return {
    order: initialOrder,
    setOrder: (order: OrderProps) => {
      localStorage.setItem("order", JSON.stringify(order));
      set({ order });
    },
  };
});
