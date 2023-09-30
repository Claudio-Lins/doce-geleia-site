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

interface OrderDetails {
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
  productSelected: ProductSelected[]
  orderDetails: OrderDetails[]
  add: (productSelected: ProductSelected) => void
  remove: (productSelectedId: string) => void
  addOrderDetails: (orderDetails: OrderDetails) => void
  removeOrderDetails: (orderDetailsId: string) => void
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

      orderDetails: [] as OrderDetails[],
      addOrderDetails(orderDetails) {
        return set((state: OrderStore) => {
          const isOrderDetailsInCart = state.orderDetails.some(
            (orderDetail) => orderDetail.id === orderDetails.id
          )
          if (isOrderDetailsInCart) {
            alert("Order already in cart")
            return state
          }
          return {
            ...state,
            orderDetails: state.orderDetails.concat(orderDetails),
          }
        })
      },
      removeOrderDetails(orderDetailsId) {
        return set((state) => ({
          ...state,
          orderDetails: state.orderDetails.filter(
            (orderDetails) => orderDetails.id !== orderDetailsId
          ),
        }))
      },
    }),

    { name: "order-store" }
  )
)
