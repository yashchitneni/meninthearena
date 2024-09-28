import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // Here you would typically save the data to a database or send it to an external service
  console.log('Form submission:', body)

  // For now, we'll just return a success response
  return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 })
}