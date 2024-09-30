'use client';

import React from 'react';
import { usePopupStore } from '@/store/popupStore';
import { PopupDialog } from './PopupDialog';

const ClientPopupDialogWrapper: React.FC = () => {
  const { isOpen, closePopup } = usePopupStore();

  return <PopupDialog isOpen={isOpen} onClose={closePopup} />;
};

export default ClientPopupDialogWrapper;
