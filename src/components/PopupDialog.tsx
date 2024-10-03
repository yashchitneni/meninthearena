'use client'
import React, { useState } from 'react'
import { PopupDialogProps } from '@/types/popupDialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PopupDialog({ isOpen, onClose }: PopupDialogProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        onClose();

        // After successful submission
        window.open('https://chat.whatsapp.com/BXuB9TiJUzWEsUkCaYVlfd', '_blank');
      } else {
        console.error('Form submission failed');
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-2 text-black">Men In The Arena</DialogTitle> {/* Changed color to black */}
          <DialogDescription className="text-lg mb-4">
            Join our community of men committed to growth and transformation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2"> {/* Adjusted space-y-* */}
          <Input placeholder="First name" className="mb-2" />
          <Input placeholder="Last name" className="mb-2" />
          <Input placeholder="Email" className="mb-4" />
          <Button type="submit" className="w-full">Enter The Arena</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}