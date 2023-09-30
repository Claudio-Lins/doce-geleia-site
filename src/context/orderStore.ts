import { create } from "zustand"

export type Order = {
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
  order: {
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
  add: (order: Order) => void
  remove: (orderId: string) => void
}

export const useOrderStore = create<OrderStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  order: [] as Order[],

  add(order) {
    return set((state) => ({
      ...state,
      order: [...state.order, order],
    }))
  },

  remove(orderId) {
    return set((state) => ({
      ...state,
      order: state.order.filter((order) => order.id !== orderId),
    }))
  },
}))
