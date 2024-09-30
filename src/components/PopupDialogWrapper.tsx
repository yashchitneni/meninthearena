'use client'

import React from 'react';
import { PopupDialogProps } from '../types/popupDialog';

/**
 * PopupDialogWrapper component for displaying a popup dialog.
 * @param {PopupDialogProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered PopupDialogWrapper component or null if not open.
 */
const PopupDialogWrapper: React.FC<PopupDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <button onClick={onClose} className="float-right text-gray-500">
          Close
        </button>
        <div>
          {/* Popup content goes here */}
          <h2 className="text-xl font-bold">Popup Title</h2>
          <p>This is the popup content.</p>
        </div>
      </div>
    </div>
  );
};

export default PopupDialogWrapper;