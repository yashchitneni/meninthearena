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

      // Fetch leader details if 'Leader Name' is a single record
      let leaderName: string | null = null; // Initialize as null
      if (nextWorkout['Leader Name']) {
        const leaderId = String(nextWorkout['Leader Name']); // Convert to string
        const leaderRecord = await base('Men In Arena - Contact Info').find(leaderId);
        console.log('Leader Record:', leaderRecord);
        leaderName = `${leaderRecord.fields['First Name']} ${leaderRecord.fields['Last Name']}`;
      }

      // Return the response with the leader's name
      return NextResponse.json({
        name: nextWorkout.Name,
        date: formattedDate,
        time: formattedTime,
        location: nextWorkout.Location,
        description: nextWorkout.Description || "No description available.",
        leaderName // Use the single leaderName
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