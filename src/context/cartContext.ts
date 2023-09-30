import { create } from "zustand"
import { persist } from "zustand/middleware"

type Product = {
  id: string
  title: string
  coverUrl: string
  createdAt: string
  productDetail: {
    qt50: number
    qt130: number
    qt250: number
  }
}

type CartStore = {
  showCart: boolean
  setShowCart: (showCart: boolean) => void
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      showCart: false,
      setShowCart: (showCart: boolean) => set({ showCart }),
      cart: [] as Product[],
      addToCart: (product) => {
        set((state) => {
          const existingProductIndex = state.cart.findIndex(
            (item) => item.id === product.id
          )
          if (existingProductIndex >= 0) {
            const newCart = [...state.cart]
            newCart[existingProductIndex].productDetail.qt50 +=
              product.productDetail.qt50
            newCart[existingProductIndex].productDetail.qt130 +=
              product.productDetail.qt130
            newCart[existingProductIndex].productDetail.qt250 +=
              product.productDetail.qt250
            return { cart: newCart }
          } else {
            return { cart: [...state.cart, product] }
          }
        })
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }))
      },
    }),
    { name: "cart-store" }
  )
)
