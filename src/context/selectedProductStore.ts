import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Product = {
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

export type ProductState = {
  productSelected: Product[]
  add: (productSelected: Product) => void
  remove: (productSelectedId: string) => void
}

export const useSelectedProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productSelected: [] as Product[],

      add(productSelected) {
        return set((state) => ({
          ...state,
          productSelected: [...state.productSelected, productSelected],
        }))
      },

      remove(productSelectedId) {
        return set((state) => ({
          ...state,
          products: state.productSelected.filter(
            (product) => product.id !== productSelectedId
          ),
        }))
      },
    }),
    { name: "product-store" }
  )
)
