'use client'
import React from 'react'
import { PopupDialogProps } from '@/types/popupDialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function PopupDialog({ isOpen, onClose }: PopupDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 text-center flex flex-col items-center">
          <DialogTitle className="text-2xl sm:text-3xl font-bold mb-4 text-black text-center w-full">
            Men In The Arena
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg text-gray-600 text-center w-full max-w-md">
            Join below for updates on workouts, community events, and insights for men ready to grow
          </DialogDescription>
        </DialogHeader>
        <div className="w-full px-6 pb-6">
          <div className="bg-white rounded-lg overflow-hidden">
            <iframe 
              src="https://meninthearena.substack.com/embed" 
              width="100%" 
              height="150"
              style={{ 
                border: '1px solid #EEE',
                background: 'white',
                display: 'block',
                marginBottom: '-5px'
              }}
              frameBorder="0" 
              scrolling="no"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}