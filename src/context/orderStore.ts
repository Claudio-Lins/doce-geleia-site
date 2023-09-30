import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProductSelected = {
  id: string
  title: string
  coverUrl: string
  productDetail: {
    id: string
    weight: string
    price: number
    quantity: number
    productId: string
    createdAt: string
  }[]
}

interface OrderStore {
  step: number
  setStep: (step: number) => void
  productSelected: {
    id: string
    title: string
    coverUrl: string
    productDetail: {
      id: string
      weight: string
      price: number
      quantity: number
      productId: string
      createdAt: string
    }[]
  }[]
  add: (productSelected: ProductSelected) => void
  remove: (productSelectedId: string) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      step: 1,
      setStep: (step) => set({ step }),
      productSelected: [] as ProductSelected[],
      add(productSelected) {
        return set((state: OrderStore) => {
          const isProductSelectedInCart = state.productSelected.some(
            (product) => product.id === productSelected.id
          )
          if (isProductSelectedInCart) {
            alert("Product already in cart")
            return state
          }
          return {
            ...state,
            productSelected: state.productSelected.concat(productSelected),
          }
        })
      },
      remove(productSelectedId) {
        return set((state) => ({
          ...state,
          productSelected: state.productSelected.filter(
            (productSelected) => productSelected.id !== productSelectedId
          ),
        }))
      },
    }),
    { name: "selectedProducts" }
  )
)
