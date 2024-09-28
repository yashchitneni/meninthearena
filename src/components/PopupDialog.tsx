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
        closePopup();
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
            <label htmlFor="firstName" className="text-sm font-medium block">
              First Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium block">
              Last Name
            </label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
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