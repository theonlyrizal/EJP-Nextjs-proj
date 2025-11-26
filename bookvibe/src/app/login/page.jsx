'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext/AuthContext';

export default function Login() {
  const router = useRouter();
  const { signInUser, signInWithGoogle, user } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) router.push('/');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInUser(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <button onClick={handleGoogle} className="btn btn-outline w-full mb-4">
          Sign in with Google
        </button>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <button className="btn btn-primary w-full text-primary-content">Sign in</button>
        </form>
      </div>
    </main>
  );
}
