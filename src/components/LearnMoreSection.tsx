/**
 * LearnMoreSection component for displaying additional information.
 * @module components/LearnMoreSection
 */

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button";
import { Episode } from '@/types/episode'
import { Workout } from '@/types/workout';

/**
 * Renders a section with additional information and a call-to-action button.
 * @function LearnMoreSection
 * @returns {JSX.Element} The rendered LearnMoreSection component.
 */
export default function LearnMoreSection() {
  const [nextWorkout, setNextWorkout] = useState<Workout | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    async function fetchNextWorkout() {
      try {
        const response = await fetch('/api/next-workout');
        if (!response.ok) {
          throw new Error('Failed to fetch next workout');
        }
        const data = await response.json();
        setNextWorkout(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchNextWorkout();
  }, []);

  const eventDetails = {
    summary: nextWorkout?.name,
    description: `Join the workout led by ${nextWorkout?.leader?.name || "No leader available."}`,
    location: nextWorkout?.location,
    start: new Date(`${nextWorkout?.date} ${nextWorkout?.time}`),
    end: new Date(new Date(`${nextWorkout?.date} ${nextWorkout?.time}`).getTime() + 60 * 60 * 1000),
  };

  const startDate = eventDetails.start instanceof Date && !isNaN(eventDetails.start.getTime()) ? eventDetails.start : new Date();
  const endDate = eventDetails.end instanceof Date && !isNaN(eventDetails.end.getTime()) ? eventDetails.end : new Date();

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.summary ?? 'No Title')}&details=${encodeURIComponent(eventDetails.description ?? 'No Description')}&location=${encodeURIComponent(eventDetails.location ?? 'No Location')}&dates=${startDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`;

  const outlookCalendarLink = `https://outlook.live.com/owa/?path=/calendar/action/compose&subject=${encodeURIComponent(eventDetails.summary ?? 'No Title')}&body=${encodeURIComponent(eventDetails.description ?? 'No Description')}&location=${encodeURIComponent(eventDetails.location ?? 'No Location')}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;

  return (
    <section className="bg-black text-white py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">LEARN MORE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Bi-Weekly Workouts */}
          <div className="flex flex-col items-center text-center h-full relative">
            {/* Image and Description */}
            <div className="mb-4 relative w-full aspect-video">
              <Image
                src="/images/homepage/learn-more/bi-weekly_workouts.jpg" // Update with the correct image path
                alt="Bi-Weekly Workouts"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#C8A870]">Bi-Weekly Workouts</h3>
            <p className="mb-4 flex-grow">
              Every other Friday, we host a men's workout led by a different brother.
            </p>
            
            {/* Join Workout Button */}
            <button 
              className="bg-[#C8A870] text-black px-6 py-2 rounded-full font-bold hover:bg-[#B69660] transition duration-300 mt-auto"
              onClick={() => setShowOptions(!showOptions)}
            >
              Join Workout
            </button>
            
            {/* Calendar Options */}
            {showOptions && (
              <div className="mt-2">
                <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" className="block text-center bg-blue-500 text-white py-2 rounded mb-2">
                  Add to Google Calendar
                </a>
                <a href={outlookCalendarLink} target="_blank" rel="noopener noreferrer" className="block text-center bg-blue-500 text-white py-2 rounded">
                  Add to Outlook Calendar
                </a>
              </div>
            )}
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