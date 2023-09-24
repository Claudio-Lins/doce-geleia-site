import { create } from "zustand"

interface ModalStore {
  showModalProducts: boolean
  setShowModalProducts: (showModalProducts: boolean) => void
}

const ModalContexts = create<ModalStore>((set) => ({
  showModalProducts: false,
  setShowModalProducts: (showModalProducts: boolean) =>
    set({ showModalProducts }),
}))

export default ModalContexts
