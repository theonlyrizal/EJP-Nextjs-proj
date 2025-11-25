'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ManageBooks() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('bookvibeUser');
    if (!raw) {
      router.push('/login');
      return;
    }
    setAuthorized(true);
    fetch('/books.json')
      .then((r) => r.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setBooks([]));
  }, [router]);

  const remove = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!authorized) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.category}</td>
                <td>${b.price}</td>
                <td>
                  <div className="flex gap-2">
                    <Link href={`/books/${b.id}`} className="btn btn-sm btn-outline">
                      View
                    </Link>
                    <button onClick={() => remove(b.id)} className="btn btn-sm btn-error">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
