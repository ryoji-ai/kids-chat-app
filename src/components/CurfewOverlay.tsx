'use client';

import { getCurfewMessage } from '@/lib/curfew';

export default function CurfewOverlay() {
  const message = getCurfewMessage();

  return (
    <div className="fixed inset-0 bg-indigo-900/90 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="text-8xl mb-6">🌙</div>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#C7CEEA' }}>
          おやすみタイム
        </h2>
        <p className="text-gray-600 whitespace-pre-line text-lg leading-relaxed">
          {message}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <span className="text-3xl">⭐</span>
          <span className="text-3xl">🌟</span>
          <span className="text-3xl">⭐</span>
        </div>
      </div>
    </div>
  );
}
