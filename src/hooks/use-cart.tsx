import { create } from "zustand"
import { toast } from "react-hot-toast"
import { persist, createJSONStorage } from "zustand/middleware"

import { ProductDetailTypes, ProductTypes } from "@/@types"
import { AlertTriangle } from "lucide-react"

interface CartStore {
  items: ProductDetailTypes[]
  addItem: (data: ProductDetailTypes) => void
  removeItem: (id: string) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductDetailTypes) => {
        set({ items: [...get().items, data] })
        toast.success("Item added to cart.")
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) })
        toast.error("Item removed from cart.")
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCart
