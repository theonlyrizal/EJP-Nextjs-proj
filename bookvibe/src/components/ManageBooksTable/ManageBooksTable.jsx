'use client';
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext/AuthContext';
import useAxios, { authHeadersFromUser } from '@/hooks/useAxios';

export default function ManageBooksTable() {
  const { user } = useContext(AuthContext) || {};
  const axios = useAxios();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const headers = await authHeadersFromUser(user);
        const res = await axios.get('/books/my-books', { headers });
        const data = res.data;
        if (mounted) setBooks(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (mounted) setBooks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (user) fetchBooks();
    else {
      setBooks([]);
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [user, axios]);

  const remove = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      setDeletingId(id);
      const headers = await authHeadersFromUser(user);
      const res = await axios.delete(`/books/${id}`, { headers });
      if (res.status >= 400) throw new Error('Delete failed');
      setBooks((previous) =>
        previous.filter((item) => {
          const itemId = (item._id || item.id || '').toString();
          return itemId !== id.toString();
        })
      );
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || 'Could not delete item');
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
            const rowId = b._id ? b._id.toString() : b.id ? b.id.toString() : '';
            return (
              <tr key={rowId}>
                <td>{b.title}</td>
                <td>{b.category}</td>
                <td>${b.price}</td>
                <td>
                  <div className="flex gap-2">
                    <Link href={`/books/${rowId}`} className="btn btn-sm btn-outline">
                      View
                    </Link>
                    <button
                      onClick={() => remove(rowId)}
                      className="btn btn-sm btn-error"
                      disabled={deletingId === rowId}
                    >
                      {deletingId === rowId ? 'Deleting...' : 'Delete'}
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
