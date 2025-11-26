'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext/AuthContext';

export default function Register() {
  const router = useRouter();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await createUser(email, password);
      if (res?.user) {
        await updateUserProfile(name || email.split('@')[0], '/favicon.ico');
      }
      router.push('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="input input-bordered w-full"
          />
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
          <button className="btn btn-primary w-full text-primary-content">Register</button>
        </form>
      </div>
    </main>
  );
}
