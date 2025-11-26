'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext/AuthContext';
import useAxios from '@/hooks/useAxios';
import { FaGoogle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const router = useRouter();
  const { signInUser, signInWithGoogle, user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      const result = await signInWithGoogle();

      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
        favorites: [],
      };

      try {
        // include freshly issued id token to ensure server can verify user if needed
        const token = await result.user.getIdToken(true);
        await axiosInstance.post('/users', newUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.error('Error saving user:', e);
      }

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

        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <div className="relative w-full">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <button className="btn btn-primary w-full text-primary-content">Sign in</button>
          <button onClick={handleGoogle} className="btn btn-outline w-full mb-4">
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </form>
      </div>
    </main>
  );
}
