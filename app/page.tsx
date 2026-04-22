
"use client";

import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async () => {
    setIsLoading(true);
    setResponse(""); 
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "Request from Professional UI" }),
      });
      const data = await res.json();
      
      
      setResponse(`${data.msg} (at ${data.timestamp})`);
      alert(`Success! Data received on Serverless Edge: ${data.message}`);

    } catch (err) {
      console.error(err);
      setResponse("Error triggering serverless function.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-700">Serverless Pulse</h1>
        <p className="mt-2 text-slate-600">Modern Automated Cloud Architecture</p>
        
        <div className="h-px bg-slate-200 my-6"></div>
        
        <p className="text-sm text-slate-500 mb-6">Click the button to trigger a Serverless Function on Vercel's Global Edge Network.</p>

        <button 
          onClick={submitData}
          disabled={isLoading}
          className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-150 ${
            isLoading 
            ? 'bg-slate-300 text-slate-600 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? 'Processing Request...' : 'Execute Serverless Function'}
        </button>

        {response && (
          <div className="mt-8 p-5 rounded-xl bg-blue-50 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-800">Server Response</h3>
            <p className="mt-2 text-blue-700 font-mono text-sm leading-relaxed">{response}</p>
          </div>
        )}
      </div>

      <footer className="absolute bottom-6 text-sm text-slate-400">
        CI/CD via GitHub → Deployed on Vercel Edge
      </footer>
    </div>
  );
}