import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);
;

export async function GET() {
  try {
    const records = await base('Men in the Arena Workouts').select({
      maxRecords: 1,
      sort: [{field: "Date", direction: "asc"}],
      filterByFormula: "IS_AFTER({Date}, TODAY())"
    }).firstPage();

    if (records.length > 0) {
      const nextWorkout = records[0].fields;

      // Format the date and time
      const workoutDate = nextWorkout.Date && typeof nextWorkout.Date === 'string' ? new Date(nextWorkout.Date) : new Date(); // Ensure Date is a string
      const formattedDate = workoutDate.toLocaleDateString(); // Adjust format as needed
      const formattedTime = workoutDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Adjust format as needed

      let leader: { name: string | null; igHandle: string | null } | null = null; // Initialize leader as null
      if (nextWorkout['Leader Name']) {
        const leaderId = String(nextWorkout['Leader Name']); // Convert to string
        const leaderRecord = await base('Men In Arena - Contact Info').find(leaderId);
        console.log('Leader Record:', leaderRecord);
        leader = {
          name: `${leaderRecord.fields['First Name']} ${leaderRecord.fields['Last Name']}`,
          igHandle: typeof leaderRecord.fields['IG Handle'] === 'string' ? leaderRecord.fields['IG Handle'] : null,
        };
      }

      // After fetching the workout data
      console.log(nextWorkout); // Check the structure of nextWorkout

      // Return the response with the leader's name and IG Handle
      return NextResponse.json({
        name: nextWorkout.Name,
        date: formattedDate,
        time: formattedTime,
        location: nextWorkout.Location,
        description: nextWorkout.Description || "No description available.",
        leader, // Include the leader object
      });
    } else {
      console.log('No upcoming workouts found.');
      return NextResponse.json({ message: "No upcoming workouts found." }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return NextResponse.json({ message: "Error fetching data from Airtable" }, { status: 500 });
  }
}