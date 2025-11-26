'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddBookForm from '@/components/Forms/AddBookForm';
import AuthContext from '@/context/AuthContext/AuthContext';

export default function AddBooks() {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

  if (loading)
    return (
      <div className="p-8">
        <span className="loading loading-spinner loading-xl"></span>
        Loading...
      </div>
    );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Add Book</h1>
      <AddBookForm onSuccess={(data) => console.log('added', data)} />
    </main>
  );
}
