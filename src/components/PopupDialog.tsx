'use client'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePopupStore } from '@/store/popupStore'

export interface PopupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PopupDialog({ isOpen, onClose }: PopupDialogProps) {
  const { isOpen: popupIsOpen, closePopup } = usePopupStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Example API call - replace with your actual API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        // If submission is successful, redirect
        window.location.href = '/welcome' // Replace with your desired redirect URL
      } else {
        // Handle errors
        console.error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    closePopup()
  }

  return (
    <Dialog open={popupIsOpen} onOpenChange={closePopup}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-3xl font-bold mb-2">Men In The Arena</DialogTitle>
          <DialogDescription className="text-lg">
            Join our community of men committed to growth and transformation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium block">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium block">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="text-center">
            <Button type="submit" className="w-full bg-[#C8A870] text-black hover:bg-[#B69660] hover:text-white">
              Enter The Arena
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}