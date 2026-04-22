"use client";

import { useState } from 'react';

export default function Home() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const submitData = async () => {
    setIsLoading(true);
    setShowResponse(false);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "Animated Request" }),
      });
      const data = await res.json();
      
      // Undefined error fix: data.message ya data.msg dono check kar rahe hain
      const serverMsg = data.message || data.msg || "Success!";
      setResponse(`${serverMsg} - Received at ${data.timestamp || new Date().toLocaleTimeString()}`);
      
      setTimeout(() => setShowResponse(true), 200);
    } catch (err) {
      setResponse("Error triggering serverless function.");
      setShowResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .animate-pop { animation: fadeIn 0.6s ease-out forwards; }
      `}</style>

      <div className="animate-pop" style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: '1px solid white'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#1d4ed8', margin: '0 0 10px 0' }}>Serverless Pulse</h1>
        <p style={{ color: '#64748b', fontWeight: '500', margin: '0 0 30px 0' }}>Modern Cloud Infrastructure</p>

        <div style={{ height: '2px', background: '#e2e8f0', margin: '20px 0', width: '100%' }}></div>

        <button 
          onClick={submitData}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '15px',
            border: 'none',
            background: isLoading ? '#cbd5e1' : '#2563eb',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
          }}
        >
          {isLoading ? 'Processing...' : 'Execute Function'}
        </button>

        {showResponse && (
          <div className="animate-pop" style={{
            marginTop: '30px',
            padding: '20px',
            borderRadius: '20px',
            background: '#1e3a8a',
            color: 'white',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ height: '8px', width: '8px', background: '#4ade80', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
              <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Server Response</span>
            </div>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px' }}>{response}</p>
          </div>
        )}
      </div>

      <footer style={{ marginTop: '40px', fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase' }}>
        GitHub CI/CD • Vercel Edge • Next.js
      </footer>
    </div>
  );
}
