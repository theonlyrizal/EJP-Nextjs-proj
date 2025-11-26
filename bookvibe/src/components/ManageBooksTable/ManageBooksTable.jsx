'use client';
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext/AuthContext';

export default function ManageBooksTable() {
  const { user } = useContext(AuthContext) || {};
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // Adjust this URL to your actual API if needed
        const base = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(base + '/books');
        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        if (mounted) setBooks(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (mounted) setBooks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBooks();
    return () => {
      mounted = false;
    };
  }, [user]);

  const remove = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      setDeletingId(id);
      const base = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${base}/books/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setBooks((s) => s.filter((b) => b.id !== id && b._id !== id));
    } catch (e) {
      console.error(e);
      alert('Could not delete item');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-6">Loading books...</div>;

  if (!books || books.length === 0) return <div className="p-6">No books available.</div>;

  return (
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
          {books.map((b) => {
            const id = b.id || b._id || b._id?.toString();
            return (
              <tr key={id}>
                <td>{b.title}</td>
                <td>{b.category}</td>
                <td>${b.price}</td>
                <td>
                  <div className="flex gap-2">
                    <Link href={`/books/${id}`} className="btn btn-sm btn-outline">
                      View
                    </Link>
                    <button
                      onClick={() => remove(id)}
                      className="btn btn-sm btn-error"
                      disabled={deletingId === id}
                    >
                      {deletingId === id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
