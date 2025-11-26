'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import DataContext from '@/context/DataContext/DataContext';

function BookCard({ book }) {
  const bookId = book._id ? book._id.toString() : book.id ? book.id.toString() : '';
  return (
    <div className="card card-compact bg-base-100 shadow hover:shadow-lg transition-shadow">
      <figure>
        <img src={book.image} alt={book.title} className="h-44 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{book.title}</h2>
        <p className="text-sm text-muted line-clamp-2">{book.shortDescription}</p>
        <div className="card-actions items-center justify-between mt-2">
          <div className="text-secondary font-semibold">${book.price}</div>
          <Link href={`/books/${bookId}`} className="btn btn-sm btn-outline">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedGrid() {
  const { booksData } = useContext(DataContext);
  const books = Array.isArray(booksData) ? booksData.slice(0, 6) : [];

  if (!books.length) return null;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Featured Books</h2>
        <Link href="/books" className="text-primary">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b) => (
          <BookCard key={b._id || b.id} book={b} />
        ))}
      </div>
    </section>
  );
}
