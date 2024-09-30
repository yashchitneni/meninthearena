/**
 * API route handler for form submission.
 * @module api/submit-form
 */

import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Configure Airtable
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

/**
 * Handles POST requests for form submission.
 * @async
 * @function POST
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
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