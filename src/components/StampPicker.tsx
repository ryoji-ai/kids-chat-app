'use client';

import { stamps } from '@/lib/stamps';

interface StampPickerProps {
  onSelect: (stampUrl: string) => void;
  onClose: () => void;
}

export default function StampPicker({ onSelect, onClose }: StampPickerProps) {
  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl shadow-xl p-4 border-2 border-pink-100">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-gray-600">スタンプ</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {stamps.map((stamp) => (
          <button
            key={stamp.id}
            onClick={() => onSelect(stamp.url)}
            className="text-3xl p-2 hover:bg-pink-50 rounded-xl transition-colors active:scale-95"
            title={stamp.name}
          >
            {stamp.url}
          </button>
        ))}
      </div>
    </div>
  );
}
