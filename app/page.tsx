export default function Home() {
  const submitData = async () => {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ message: "Pro Project Working!" }),
    });
    const data = await res.json();
    alert(data.msg);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Serverless Pulse</h1>
      <p className="mt-4 text-gray-600">Solo Student Project - Built with Vercel</p>
      <button 
        onClick={submitData}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Trigger Serverless Function
      </button>
    </div>
  );
}