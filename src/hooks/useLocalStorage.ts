import { useEffect } from "react";
import { useCartStore } from "./useCartStore";
import { useOrderStore } from "./useOrderStore";

export const useLocalStorage = () => {
  const items = useCartStore((state) => state.items);
  const order = useOrderStore((state) => state.order);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("order", JSON.stringify(order));
  }, [items, order]);
};
