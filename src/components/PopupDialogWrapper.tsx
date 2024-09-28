'use client'

import { PopupDialog, PopupDialogProps } from './PopupDialog'
import { useState } from 'react';

export function PopupDialogWrapper({ isOpen, onClose }: PopupDialogProps) {
  return <PopupDialog isOpen={isOpen} onClose={onClose} />
}

export function PopupDialogProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const onClose = () => setIsOpen(false);
  
    return (
      <>
        {children}
        <PopupDialogWrapper isOpen={isOpen} onClose={onClose} />
      </>
    );
  }