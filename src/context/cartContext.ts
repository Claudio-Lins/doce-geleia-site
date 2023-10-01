import { Car } from "lucide-react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartProduct = {
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
  cart: CartProduct[]
  addToCart: (product: CartProduct) => void
  removeFromCart: (productId: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) =>
      ({
        showCart: false,
        setShowCart: (showCart: boolean) => set({ showCart }),
        cart: [] as CartProduct[],
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
              return { ...state, cart: newCart }
            } else {
              return { ...state, cart: [...state.cart, product] }
            }
          })
        },

        removeFromCart: (productId) => {
          set((state) => {
            const existingProductIndex = state.cart.findIndex(
              (item) => item.id === productId
            )
            if (existingProductIndex >= 0) {
              const newCart = [...state.cart]
              newCart[existingProductIndex].productDetail.qt50 -= 1
              newCart[existingProductIndex].productDetail.qt130 -= 1
              newCart[existingProductIndex].productDetail.qt250 -= 1
              if (
                newCart[existingProductIndex].productDetail.qt50 === 0 &&
                newCart[existingProductIndex].productDetail.qt130 === 0 &&
                newCart[existingProductIndex].productDetail.qt250 === 0
              ) {
                newCart.splice(existingProductIndex, 1)
              }
              return { ...state, cart: newCart }
            } else {
              return state
            }
          })
        },
      } as CartStore),

    { name: "cart-product-store" }
  )
)
