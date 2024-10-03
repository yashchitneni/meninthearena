import React, { useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import { Workout } from '@/types/workout';

export default function NextWorkoutSection() {
  const [nextWorkout, setNextWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Updated type to allow string
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

  const handleAddToCalendar = () => {
    setShowOptions(!showOptions);
  };

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
                <p className="text-gray-300 mb-6">
                    Leader: {nextWorkout.leader ? (
                        <a 
                            href={`https://instagram.com/${nextWorkout.leader.igHandle}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 underline"
                        >
                            {nextWorkout.leader.name}
                        </a>
                    ) : "No leader available."}
                </p>
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
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <button 
              className="w-full bg-[#C8A870] text-black font-bold py-3 px-6 rounded-full hover:bg-[#B69660] transition duration-300"
              onClick={handleAddToCalendar}
            >
              Join Workout
            </button>
            {showOptions && (
              <div className="mt-4">
                <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" className="block text-center bg-blue-500 text-white py-2 rounded mb-2">
                  Add to Google Calendar
                </a>
                <a href={outlookCalendarLink} target="_blank" rel="noopener noreferrer" className="block text-center bg-blue-500 text-white py-2 rounded">
                  Add to Outlook Calendar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}