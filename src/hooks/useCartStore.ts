import { create } from "zustand"
import { useEffect } from "react"

type CartItem = {
  id: string
  title: string
  price: number
  weight: string
  size: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const itemExists = state.items.find(
        (i) => i.id === item.id && i.size === item.size
      )

      if (itemExists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      } else {
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }
    }),
  removeItem: (id, size) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id || item.size !== size),
    })),
}))

export const useUpdateLocalStorage = () => {
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])
}
