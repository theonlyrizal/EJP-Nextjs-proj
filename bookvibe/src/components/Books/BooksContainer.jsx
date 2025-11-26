'use client';
import React, { useMemo, useState, useContext } from 'react';
import BookCard from '@/components/Books/BookCard';
import DataContext from '@/context/DataContext/DataContext';

export default function BooksContainer({ initialLimit }) {
  const { booksData } = useContext(DataContext) || { booksData: [] };
  console.log(booksData);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const booksToDisplay = useMemo(() => {
    const list = Array.isArray(booksData) ? booksData : [];
    return initialLimit && Array.isArray(list) ? list.slice(0, initialLimit) : list;
  }, [booksData, initialLimit]);

  const categories = useMemo(() => {
    const derived = Array.from(
      new Set(booksToDisplay.map((book) => (book.category ? book.category : 'Uncategorized')))
    );
    return ['All', ...derived];
  }, [booksToDisplay]);

  const filteredBooks = booksToDisplay.filter((book) => {
    const q = (searchQuery || '').trim().toLowerCase();
    const matchesText =
      !q ||
      (book.title && book.title.toLowerCase().includes(q)) ||
      (book.author && book.author.toLowerCase().includes(q));
    const bookCategory = book.category ? book.category : 'Uncategorized';
    const matchesCategory = selectedCategory === 'All' || bookCategory === selectedCategory;
    return matchesText && matchesCategory;
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or author"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book._id || book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
