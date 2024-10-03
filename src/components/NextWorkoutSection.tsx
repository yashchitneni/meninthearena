import React, { useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import { Workout } from '@/types/workout';

export default function NextWorkoutSection() {
  const [nextWorkout, setNextWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Updated type to allow string

  useEffect(() => {
    async function fetchNextWorkout() {
      try {
        const response = await fetch('/api/next-workout');
        if (!response.ok) {
          throw new Error('Failed to fetch next workout');
        }
        const data = await response.json();
        setNextWorkout(data);
        console.log('Next Workout Data:', data); // Log the fetched data
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNextWorkout();
  }, []);

  // Add a new section to display the workout leader
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#C8A870]">NEXT WORKOUT</h2>
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="p-6 sm:p-8">
            {nextWorkout ? ( // Check if nextWorkout is not null
              <>
                <h3 className="text-2xl font-bold mb-4 text-white">{nextWorkout.name}</h3>
                <p className="text-gray-300 mb-6">Leader: {nextWorkout.leaderName || "No leader available."}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-300">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-[#C8A870]" />
                    <span>{nextWorkout.date}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-[#C8A870]" />
                    <span>{nextWorkout.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-[#C8A870]" />
                    <span>{nextWorkout.location}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-300">Loading next workout...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}