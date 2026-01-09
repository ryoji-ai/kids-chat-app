'use client';

import { Message } from '@/lib/types';
import { presetUsers } from '@/lib/users';

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export default function ChatMessage({ message, isOwn }: ChatMessageProps) {
  const sender = presetUsers.find((u) => u.id === message.senderId);

  const formatTime = (timestamp: { seconds: number }) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-2 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">
        {sender?.avatarUrl || '👤'}
      </div>
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <span className="text-xs text-gray-500 mb-1 px-1">
          {sender?.displayName || 'ゲスト'}
        </span>
        <div
          className={`chat-bubble ${
            isOwn ? 'chat-bubble-self' : 'chat-bubble-other'
          }`}
        >
          {message.type === 'stamp' ? (
            <span className="text-5xl">{message.content}</span>
          ) : (
            <p className="text-gray-700">{message.content}</p>
          )}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">
          {formatTime(message.createdAt as { seconds: number })}
        </span>
      </div>
    </div>
  );
}
