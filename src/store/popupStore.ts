import { create } from 'zustand'

interface PopupStore {
  isOpen: boolean
  openPopup: () => void
  closePopup: () => void
}

export const usePopupStore = create<PopupStore>((set) => ({
  isOpen: false,
  openPopup: () => set({ isOpen: true }),
  closePopup: () => set({ isOpen: false }),
}))