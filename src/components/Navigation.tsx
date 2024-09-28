'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { usePopupStore } from '@/store/popupStore'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openPopup } = usePopupStore()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleCommunityClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openPopup()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/MTA_Badge_Concept_2_White.png"
            alt="Men In The Arena Logo"
            width={50}
            height={50}
            className="mr-2"
          />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            <li>
              <Link href="/workouts" className="text-white hover:text-gray-300">
                Workouts
              </Link>
            </li>
            <li>
              <button onClick={openPopup} className="text-white hover:text-gray-300">
                Community
              </button>
            </li>
            <li>
              <Link href="/podcast" className="text-white hover:text-gray-300">
                Podcast
              </Link>
            </li>
            <li>
              <Button 
                variant="outline"
                className="bg-[#C8A870] text-black hover:bg-[#B69660] hover:text-white transition duration-300"
                onClick={openPopup}
              >
                Step Into The Arena
              </Button>
            </li>
          </ul>
        </nav>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          Menu
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link href="/workouts" className="text-white hover:text-gray-300">
                Workouts
              </Link>
            </li>
            <li>
              <button
                onClick={handleCommunityClick}
                className="text-white hover:text-gray-300"
              >
                Community
              </button>
            </li>
            <li>
              <Link href="/podcast" className="text-white hover:text-gray-300">
                Podcast
              </Link>
            </li>
            <li>
              <Button 
                variant="outline"
                className="bg-[#C8A870] text-black hover:bg-[#B69660] hover:text-white transition duration-300"
                onClick={() => {
                  openPopup()
                  setIsMenuOpen(false)
                }}
              >
                Step Into The Arena
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

