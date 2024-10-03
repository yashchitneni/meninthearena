import React from 'react'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'

// Note: In a real-world scenario, you'd fetch this data from an API
const nextWorkout = {
  date: "June 16, 2023",
  time: "6:00 PM",
  location: "Central Park, NYC",
  name: "Strength & Endurance Challenge",
  description: "Push your limits with a combination of strength training and endurance exercises. This workout is designed to test your physical and mental fortitude."
}

export default function NextWorkoutSection() {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#C8A870]">NEXT WORKOUT</h2>
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">{nextWorkout.name}</h3>
            <p className="text-gray-300 mb-6">{nextWorkout.description}</p>
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
          </div>
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <button 
              className="w-full bg-[#C8A870] text-black font-bold py-3 px-6 rounded-full hover:bg-[#B69660] transition duration-300"
              onClick={() => {/* Add your join workout logic here */}}
            >
              Join This Workout
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}