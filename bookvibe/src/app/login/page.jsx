'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const user = { email, name: email.split('@')[0], avatar: '/favicon.ico' };
    localStorage.setItem('bookvibeUser', JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('bookvibe:userChanged'));
    router.push('/');
  };

  const signInWithGoogle = () => {
    const user = { email: 'google.user@example.com', name: 'Google User', avatar: '/favicon.ico' };
    localStorage.setItem('bookvibeUser', JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('bookvibe:userChanged'));
    router.push('/');
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <button onClick={signInWithGoogle} className="btn btn-outline w-full mb-4">
          Sign in with Google
        </button>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary w-full text-primary-content">Sign in</button>
        </form>
      </div>
    </main>
  );
}
