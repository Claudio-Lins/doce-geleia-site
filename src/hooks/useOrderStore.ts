import { OrderProps } from "@/@types";
import { create } from "zustand";

interface OrderStore {
  order: OrderProps;
  setOrder: (order: OrderProps) => void;
  showOrderHistory: boolean;
  setShowOrderHistory: (showOrderHistory: boolean) => void;
  showTestimonial: boolean;
  setShowTestimonial: (showTestimonial: boolean) => void;
}
export const useOrderStore = create<OrderStore>((set, get) => {
  let initialOrder: OrderProps = {
    userId: "",
    orderNumber: "",
    statusPayment: "PENDING",
    statusOrder: "PENDING",
    fullName: "",
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
    showOrderHistory: false,
    setShowOrderHistory: (showOrderHistory) => set({ showOrderHistory }),
    showTestimonial: false,
    setShowTestimonial: (showTestimonial) => set({ showTestimonial }),
    order: initialOrder,
    setOrder: (order: OrderProps) => {
      localStorage.setItem("order", JSON.stringify(order));
      set({ order });
    },
  };
});
