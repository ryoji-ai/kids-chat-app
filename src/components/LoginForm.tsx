'use client';

import { useState } from 'react';
import { User } from '@/lib/types';
import { presetUsers } from '@/lib/users';
import { useAuth, validatePassphrase } from '@/contexts/AuthContext';

export default function LoginForm() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'select' | 'passphrase'>('select');
  const { login } = useAuth();

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setStep('passphrase');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (validatePassphrase(passphrase)) {
      login(selectedUser);
    } else {
      setError('あいことばが ちがうよ！');
      setPassphrase('');
    }
  };

  const handleBack = () => {
    setStep('select');
    setSelectedUser(null);
    setPassphrase('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2" style={{ color: '#FFB7B2' }}>
          🌟 かわいいチャット 🌟
        </h1>
        <p className="text-center text-gray-500 mb-8">みんなで たのしく おはなし しよう！</p>

        {step === 'select' ? (
          <div>
            <p className="text-center mb-4 font-medium">あなたは だあれ？</p>
            <div className="grid grid-cols-2 gap-3">
              {presetUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="btn-kawaii bg-white border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 flex flex-col items-center py-4"
                >
                  <span className="text-4xl mb-2">{user.avatarUrl}</span>
                  <span className="font-medium">{user.displayName}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <span className="text-6xl">{selectedUser?.avatarUrl}</span>
              <p className="mt-2 font-medium text-lg">{selectedUser?.displayName}</p>
            </div>

            <div className="mb-4">
              <label className="block text-center mb-2 font-medium">
                あいことばを いれてね 🔑
              </label>
              <input
                type="text"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-center text-lg"
                placeholder="あいことば"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-center mb-4 animate-bounce-soft">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="btn-kawaii flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                もどる
              </button>
              <button
                type="submit"
                className="btn-kawaii flex-1 text-white"
                style={{ backgroundColor: '#FFB7B2' }}
              >
                はいる！
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
