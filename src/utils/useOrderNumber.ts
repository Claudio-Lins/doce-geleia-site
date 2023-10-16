"use clinet";

import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";

interface OrderNumberProps {}

export function useOrderNumber() {
  const { setOrderNumber, orderNumber } = useCartStore();
  const orderNumberLocal = localStorage.getItem("orderNumber");
  const [count, setCount] = useState(0);

  const handleOrderNumber = () => {
    if (orderNumberLocal) {
      setOrderNumber(orderNumberLocal);
    } else {
      const orderNumber = Math.random().toString(36).substr(2, 9);
      setOrderNumber(orderNumber);
      localStorage.setItem("orderNumber", orderNumber);
    }
  };

  return {
    handleOrderNumber,
    orderNumber,
  };
}
