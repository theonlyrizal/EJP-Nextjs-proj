'use client';
import Link from 'next/link';
import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext/AuthContext';
import useAxios, { authHeadersFromUser } from '@/hooks/useAxios';
import { FaHeart } from 'react-icons/fa';

export default function BookCard({ book }) {
  const { user } = useContext(AuthContext) || {};
  const axios = useAxios();
  const [busy, setBusy] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const id = book._id ? book._id.toString() : book.id ? book.id.toString() : '';

  const toggleFavorite = async () => {
    if (!user) return alert('Please log in to favorite books');
    try {
      setBusy(true);
      const headers = await authHeadersFromUser(user);
      await axios.patch(`/books/${id}/favorite`, {}, { headers });
      setFavorited((s) => !s);
    } catch (e) {
      console.error('Favorite toggle failed', e);
      alert(e.response?.data?.message || 'Could not toggle favorite');
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
      <figure className="overflow-hidden">
        <img src={book.image} alt={book.title} className="h-44 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-lg">{book.title}</h3>
        <p className="text-sm text-muted line-clamp-2">{book.shortDescription}</p>
        <div className="card-actions items-center justify-between mt-2">
          <div className="text-primary font-semibold">${book.price}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className={`btn btn-sm btn-ghost ${favorited ? 'text-red-500' : ''}`}
              disabled={busy}
              title="Toggle favorite"
            >
              <FaHeart />
            </button>
            <Link href={`/books/${id}`} className="btn btn-sm btn-outline">
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
