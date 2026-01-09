'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Message } from '@/lib/types';
import { isCurfewTime } from '@/lib/curfew';
import ChatMessage from './ChatMessage';
import StampPicker from './StampPicker';
import CurfewOverlay from './CurfewOverlay';

export default function ChatRoom() {
  const { currentUser, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showStamps, setShowStamps] = useState(false);
  const [isCurfew, setIsCurfew] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkCurfew = () => {
      setIsCurfew(currentUser?.role === 'kid' && isCurfewTime());
    };
    checkCurfew();
    const interval = setInterval(checkCurfew, 60000);
    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(newMessages.reverse());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string, type: 'text' | 'stamp' = 'text') => {
    if (!currentUser || isCurfew) return;
    if (type === 'text' && !content.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        senderId: currentUser.id,
        content,
        type,
        createdAt: serverTimestamp(),
      });
      setInputText('');
      setShowStamps(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText, 'text');
  };

  const handleStampSelect = (stampUrl: string) => {
    sendMessage(stampUrl, 'stamp');
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white/50 backdrop-blur-sm">
      {isCurfew && <CurfewOverlay />}

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white/80 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentUser?.avatarUrl}</span>
          <span className="font-medium">{currentUser?.displayName}</span>
        </div>
        <button
          onClick={logout}
          className="text-gray-400 hover:text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-100"
        >
          でる
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pattern-dots">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-4xl mb-4">💬</p>
            <p>まだ メッセージが ないよ</p>
            <p>さいしょに おはなし してみよう！</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isOwn={msg.senderId === currentUser?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative p-4 bg-white/80 border-t border-pink-100">
        {showStamps && (
          <StampPicker
            onSelect={handleStampSelect}
            onClose={() => setShowStamps(false)}
          />
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowStamps(!showStamps)}
            className="text-2xl p-2 hover:bg-pink-50 rounded-full transition-colors"
            disabled={isCurfew}
          >
            😊
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isCurfew ? 'おやすみタイム...' : 'メッセージをかいてね...'}
            disabled={isCurfew}
            className="flex-1 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isCurfew}
            className="btn-kawaii text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FFB7B2' }}
          >
            おくる
          </button>
        </form>
      </div>
    </div>
  );
}
