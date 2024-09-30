interface PopupStore {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

export type { PopupStore }