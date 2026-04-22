import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Data received on Serverless Edge:", body);
  
  return NextResponse.json({ 
    msg: "Data Processed Successfully",
    timestamp: new Date().toLocaleTimeString()
  });
}