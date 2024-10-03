/**
 * LearnMoreSection component for displaying additional information.
 * @module components/LearnMoreSection
 */

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "./ui/button";
import { Episode } from '@/types/episode'

/**
 * Renders a section with additional information and a call-to-action button.
 * @function LearnMoreSection
 * @returns {JSX.Element} The rendered LearnMoreSection component.
 */
export default function LearnMoreSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => setIsPopupOpen(true)

  return (
    <section className="bg-black text-white py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">LEARN MORE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Bi-Weekly Workouts */}
          <div className="flex flex-col items-center text-center h-full">
            <div className="mb-4 relative w-full aspect-video">
              <Image
                src="/images/homepage/learn-more/bi-weekly_workouts.jpg"
                alt="Bi-weekly workouts"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#C8A870]">Bi-Weekly Workouts</h3>
            <p className="mb-4 flex-grow">
              Every other Friday, we host a men's workout lead by a different brother.
            </p>
            <Link 
              href="/join-workout" 
              className="bg-[#C8A870] text-black px-6 py-2 rounded-full font-bold hover:bg-[#B69660] transition duration-300 mt-auto"
            >
              Join Workout
            </Link>
          </div>
          
          {/* Private WhatsApp Group */}
          <div className="flex flex-col items-center text-center h-full">
            <div className="mb-4 relative w-full aspect-video">
              <Image
                src="/images/homepage/learn-more/whatsapp.png"
                alt="WhatsApp"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#C8A870]">Private WhatsApp Group</h3>
            <p className="mb-4 flex-grow">
              Every day, our brothers share stories, coordinate meetups, and support one another via our WhatsApp group.
            </p>
            <Link 
              href="https://chat.whatsapp.com/BXuB9TiJUzWEsUkCaYVlfd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C8A870] text-black px-6 py-2 rounded-full font-bold hover:bg-[#B69660] transition duration-300 mt-auto"
            >
              Join Group
            </Link>
          </div>
          
          {/* MTA Podcast */}
          <div className="flex flex-col items-center text-center h-full">
            <div className="mb-4 relative w-full aspect-video">
              <Image
                src="/images/homepage/learn-more/podcast.jpg"
                alt="Podcast"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#C8A870]">MTA Podcast</h3>
            <p className="mb-4 flex-grow">
              Our podcast explores the journeys of men striving for impactful, purpose-driven lives.
            </p>
            <Link 
              href="/podcast" 
              className="bg-[#C8A870] text-black px-6 py-2 rounded-full font-bold hover:bg-[#B69660] transition duration-300 mt-auto"
            >
              Listen Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}