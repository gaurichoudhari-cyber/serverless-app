import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Data received on Serverless Edge:", body);
  
  return NextResponse.json({ 
    msg: "Hello from the Cloud! Your data is processed.",
    timestamp: new Date().toLocaleTimeString()
  });
}