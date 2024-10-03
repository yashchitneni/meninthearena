// Define a type for the workout data
export interface Workout {
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    leaderName?: string; // Add this line to include leaderName
  };
