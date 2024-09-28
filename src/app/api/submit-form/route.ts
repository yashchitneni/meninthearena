import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Create a record in Airtable
    const record = await base(process.env.AIRTABLE_TABLE_ID!).create([
      {
        fields: {
          'First Name': body.firstName,
          'Last Name': body.lastName,
          'Email': body.email,
        },
      },
    ]);

    console.log('Created record:', record);

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ message: 'Error submitting form' }, { status: 500 });
  }
}