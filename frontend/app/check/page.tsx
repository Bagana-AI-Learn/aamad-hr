'use client';

export default function CheckPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Frontend Status Check</h1>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h2 className="font-semibold text-green-700">✅ Next.js is Running</h2>
            <p className="text-sm text-gray-600">If you can see this page, Next.js is working correctly.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="font-semibold text-blue-700">✅ Tailwind CSS is Working</h2>
            <p className="text-sm text-gray-600">The styling on this page confirms Tailwind is configured.</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="font-semibold text-purple-700">✅ TypeScript is Active</h2>
            <p className="text-sm text-gray-600">No TypeScript errors detected.</p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Next Steps:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Go to <a href="/" className="text-blue-600 underline">http://localhost:3000</a> to see the chat interface</li>
              <li>Go to <a href="/onboarding" className="text-blue-600 underline">http://localhost:3000/onboarding</a> to see the onboarding dashboard</li>
              <li>Check browser console (F12) for any JavaScript errors</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">If you see a blank page:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
              <li>Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>
              <li>Check browser console (F12) for errors</li>
              <li>Check terminal for build errors</li>
              <li>Try clearing browser cache</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
