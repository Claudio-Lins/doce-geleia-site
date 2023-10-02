import { create } from "zustand"
import { useEffect } from "react"

type CartItem = {
  id: string
  title: string
  coverUrl: string
  price: number
  weight: string
  size: string
  quantity: number
}

type CartStore = {
  showCart: boolean
  setShowCart: (showCart: boolean) => void
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
}

export const useCartStore = create<CartStore>((set, get) => {
  const initialCart = localStorage.getItem("cart")

  return {
    items: initialCart ? JSON.parse(initialCart) : [],
    showCart: false,
    setShowCart: (showCart) => set({ showCart }),
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
      set((state) => {
        const itemExists = state.items.find(
          (i) => i.id === id && i.size === size
        )

        if (itemExists?.quantity === 1) {
          return {
            items: state.items.filter((i) => !(i.id === id && i.size === size)),
          }
        } else {
          return {
            items: state.items.map((i) =>
              i.id === id && i.size === size
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          }
        }
      }),
  }
})
