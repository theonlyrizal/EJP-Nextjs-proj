'use client';
import React, { useContext, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DataContext from '@/context/DataContext/DataContext';

export default function BookDetail({ params }) {
  const { booksData } = useContext(DataContext);
  const { id } = use(params);

  const book = Array.isArray(booksData)
    ? booksData.find((b) => {
        const bookIdentifier = (b._id || b.id)?.toString();
        return bookIdentifier === id;
      })
    : null;

  if (!book) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">Book not found</h2>
        <p className="mt-4 text-muted">Loading or book does not exist.</p>
        <Link href="/books" className="btn btn-primary mt-6">
          Back to Books
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="card bg-base-100 p-8 shadow-xl grid gap-10 lg:grid-cols-3">
        {/* Left Column: Image and Details */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden shadow-xl relative h-96 w-full mb-8">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            />
          </div>

          <h1 className="text-4xl font-extrabold">{book.title}</h1>
          <p className="text-xl mt-2">
            by <span className="font-semibold">{book.author}</span> •{' '}
            {new Date(book.publicationDate).getFullYear()}
          </p>
          <div className="mt-6 border-t border-base-300 pt-6">
            <h2 className="text-2xl font-bold mb-3">Description</h2>
            <p className="text-base leading-relaxed">{book.fullDescription}</p>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <aside className="p-6 bg-base-300 rounded-xl">
          <div className="space-y-3">
            <p className="text-lg">
              <strong className="font-semibold">Category:</strong> {book.category}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Priority:</strong> {book.priority}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Published:</strong> {book.publicationDate}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/books" className="btn btn-primary w-full">
              Back to Books
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
