'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ManageBooksTable from '@/components/ManageBooksTable/ManageBooksTable';
import AuthContext from '@/context/AuthContext/AuthContext';

export default function ManageBooks() {
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
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
      <ManageBooksTable />
    </main>
  );
}
