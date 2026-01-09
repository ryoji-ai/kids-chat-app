'use client';

import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import ChatRoom from '@/components/ChatRoom';

function AppContent() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-soft">🌸</div>
          <p className="text-gray-500">よみこみちゅう...</p>
        </div>
      </div>
    );
  }

  return currentUser ? <ChatRoom /> : <LoginForm />;
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
