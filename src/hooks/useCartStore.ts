import { InfoClient } from "@/@types"
import { create } from "zustand"

type CartItem = {
  id: string
  title: string
  coverUrl?: string
  price: number
  weight: number
  quantity: number
}

type CartStore = {
  step: number
  setStep: (step: number) => void
  formSubmitted: string
  totalItems: number
  setTotalItems: (totalItems: number) => void
  subTotalPrice: number
  setSubTotalPrice: (subTotalPrice: number) => void
  shippingPrice: number
  setShippingPrice: (shippingPrice: number) => void
  totalWeight: number
  setTotalWeight: (totalWeight: number) => void
  showCart: boolean
  setShowCart: (showCart: boolean) => void
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, weight: number) => void
  infoClient: InfoClient
  setInfoClient: (infoClient: InfoClient) => void
  showModalOrder: boolean
  setShowModalOrder: (showModalOrder: boolean) => void
  // reset localStorage
  resetLocalStorage: () => void
}

export const useCartStore = create<CartStore>((set, get) => {
  let initialCart
  let initialInfoClient
  if (typeof window !== "undefined") {
    initialCart = localStorage.getItem("cart")
    initialInfoClient = localStorage.getItem("infoClient")
  }

  return {
    items: initialCart ? JSON.parse(initialCart) : [],

    resetLocalStorage: () => {
      localStorage.removeItem("cart")
      localStorage.removeItem("infoClient")
      set({
        items: [],
        infoClient: {
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          city: "",
          postalCode: "",
          phone: "",
          observations: "",
          complement: "",
        },
      })
    },

    formSubmitted: "formInfoClient",

    step: 1,
    setStep: (step) => set({ step }),

    showModalOrder: false,
    setShowModalOrder: (showModalOrder) => set({ showModalOrder }),

    totalItems: 0,
    setTotalItems: (totalItems) => set({ totalItems }),

    subTotalPrice: 0,
    setSubTotalPrice: (subTotalPrice) => set({ subTotalPrice }),

    shippingPrice: 6.33,
    setShippingPrice: (shippingPrice) => set({ shippingPrice }),

    totalWeight: 0,
    setTotalWeight: (totalWeight) => set({ totalWeight }),

    showCart: false,
    setShowCart: (showCart) => set({ showCart }),

    addItem: (item) =>
      set((state) => {
        const itemExists = state.items.find(
          (i) => i.id === item.id && i.weight === item.weight
        )

        if (itemExists) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.weight === item.weight
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }
        } else {
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }
      }),

    removeItem: (id, weight: number) =>
      set((state) => {
        const itemExists = state.items.find(
          (i) => i.id === id && i.weight === weight
        )

        if (itemExists?.quantity === 1) {
          return {
            items: state.items.filter(
              (i) => !(i.id === id && i.weight === weight)
            ),
          }
        } else {
          return {
            items: state.items.map((i) =>
              i.id === id && i.weight === weight
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          }
        }
      }),

    infoClient: initialInfoClient ? JSON.parse(initialInfoClient) : {},
    setInfoClient: (infoClient) => set({ infoClient }),
  }
})
