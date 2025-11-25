'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddBookForm from '@/components/Forms/AddBookForm';

export default function AddBooks() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('bookvibeUser');
    if (!raw) {
      router.push('/login');
      return;
    }
    setAuthorized(true);
    setLoading(false);
  }, [router]);

  if (loading) return <div className="p-8">Checking access...</div>;
  if (!authorized) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
      <AddBookForm onSuccess={(data) => console.log('added', data)} />
    </main>
  );
}
