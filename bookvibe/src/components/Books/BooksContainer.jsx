'use client';
import React, { useEffect, useMemo, useState } from 'react';
import BookCard from '@/components/Books/BookCard';
import useAxios from '@/hooks/useAxios';

export default function BooksContainer({ initialLimit }) {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const axios = useAxios();

  useEffect(() => {
    let mounted = true;
    axios
      .get('/books')
      .then((res) => {
        if (!mounted) return;
        const data = res.data;
        setBooks(initialLimit && Array.isArray(data) ? data.slice(0, initialLimit) : data || []);
      })
      .catch(() => {
        if (mounted) setBooks([]);
      });
    return () => {
      mounted = false;
    };
  }, [initialLimit, axios]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(books.map((b) => b.category)))],
    [books]
  );

  const filtered = books.filter((b) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q);
    const matchesCategory = category === 'All' || b.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Books</h1>
        <p className="text-muted">
          Browse our collection. Use search or category to narrow results.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        <div className="flex gap-2 w-full md:w-1/2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <BookCard key={b.id || b._id} book={b} />
        ))}
      </div>
    </section>
  );
}
