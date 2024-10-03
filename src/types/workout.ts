// Define a type for the workout data
export interface Leader {
    name: string;
    igHandle?: string; // Optional IG Handle
}

export interface Workout {
    name: string;
    description: string;
    date: string;
    time: string;
    location: string;
    leader?: Leader; 
}
