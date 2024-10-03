'use client'
/**
 * Home page component for the application.
 * @module app/page
 */

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import LearnMoreSection from '@/components/LearnMoreSection';
import { usePopupStore } from '@/store/popupStore'
import { useState } from 'react';
import NextWorkoutSection from '@/components/NextWorkoutSection';

/**
 * Renders the home page of the application.
 * @function Home
 * @returns {JSX.Element} The rendered home page component.
 */
export default function Home() {
  const { openPopup } = usePopupStore()
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <>
          <div className="flex flex-col min-h-screen bg-black text-white">
            <main className="flex-grow relative">
              <div className="relative h-screen">
                {/* Background video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    isVideoLoaded ? 'opacity-50' : 'opacity-0'
                  }`}
                >
                  <source src="/path-to-your-video.mp4" type="video/mp4" />
                </video>

                {/* Fallback image */}
                <Image
                  src="/images/homepage/mta.jpg"
                  alt="Men in the Arena"
                  fill
                  className="absolute inset-0 object-cover"
                  priority
                />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <div className="bg-gradient-to-b from-transparent to-black bg-opacity-70 p-4 sm:p-6 rounded-lg shadow-lg max-w-full sm:max-w-3xl">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-2 sm:mb-4 text-white tracking-wider leading-tight">
                      Men in the Arena
                    </h1>
                    <div className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto text-white">
                      <p className="mb-2">Embrace the Challenge.</p>
                      <p className="mb-2">Rise to Greatness.</p>
                    </div>
                    <button
                      onClick={openPopup}
                      className="bg-[#C8A870] text-black font-bold py-2 sm:py-3 px-6 sm:px-10 rounded-full text-base sm:text-lg transition-transform hover:scale-110 hover:bg-[#b89a5a] animate-fade-in-up animation-delay-600" 
                    >
                      Enter The Arena
                    </button>
                  </div>
                </div>
              </div>
            </main>

            <NextWorkoutSection />
            <LearnMoreSection />
          </div>
    </>
  )
}