import { useEffect } from "react"
import { useCartStore } from "./useCartStore"

export const useLocalStorage = () => {
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])
}
