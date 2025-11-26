'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext/AuthContext';
import useAxios from '@/hooks/useAxios';
import { FaGoogle, FaArrowRight } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Register() {
  const router = useRouter();
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

  const axiosInstance = useAxios();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [sixChar, setSixChar] = useState(false);
  const [upper, setUpper] = useState(false);
  const [lower, setLower] = useState(false);
  const validatePass = (val) => {
    const pass = val || '';
    setSixChar(pass.length >= 6);
    setUpper(/[A-Z]/.test(pass));
    setLower(/[a-z]/.test(pass));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await createUser(email, password);
      await updateUserProfile(name || email.split('@')[0], '/favicon.ico');

      const newUser = {
        name: name || email.split('@')[0],
        email,
        photoURL: '/favicon.ico',
        createdAt: new Date(),
        favorites: [],
      };

      try {
        // include fresh id token so server can verify (if required)
        const token = await result.user.getIdToken(true);
        await axiosInstance.post('/users', newUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.error('Error saving user:', e);
      }

      router.push('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      if (!result?.user) return;
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
        favorites: [],
      };

      try {
        await axiosInstance.post('/users', newUser);
      } catch (e) {
        console.error('Error saving user:', e);
      }

      router.push('/');
    } catch (e) {
      console.error('Google signup error:', e);
      setError(e.message || 'Google signup failed');
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
          <div className="relative">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePass(e.target.value);
              }}
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

          <div>
            <ul>
              <li className={`${sixChar ? 'text-accent' : 'text-red-500'} flex items-center `}>
                <FaArrowRight /> 6 character long
              </li>
              <li className={`${upper ? 'text-accent' : 'text-red-500'} flex items-center `}>
                <FaArrowRight /> At least one Upper Case
              </li>
              <li className={`${lower ? 'text-accent' : 'text-red-500'} flex items-center `}>
                <FaArrowRight /> At least one Lower Case
              </li>
            </ul>
          </div>

          <button
            className="btn btn-primary w-full text-primary-content"
            disabled={!(sixChar && upper && lower)}
          >
            Register
          </button>

          <div className="divider my-1"></div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary"
          >
            <FaGoogle /> <span className="ml-2">Sign Up with Google</span>
          </button>
        </form>
        <div className="mt-4">
          <Link href="/login" className="text-blue-400 underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </main>
  );
}
