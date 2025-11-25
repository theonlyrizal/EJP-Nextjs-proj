import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import books from '../../../../public/books.json';

export default function BookDetail({ params }) {
  const { id } = params;
  const book = books.find((b) => b.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src={book.image} alt={book.title} className="w-full h-96 object-cover" />
          </div>
          <h1 className="text-3xl font-bold mt-6">{book.title}</h1>
          <p className="text-muted">
            by {book.author} • {new Date(book.publicationDate).getFullYear()}
          </p>
          <p className="mt-4 text-base">{book.fullDescription}</p>
        </div>
        <aside className="p-6 bg-base-100 rounded-lg shadow">
          <div className="text-2xl font-semibold">${book.price}</div>
          <div className="mt-4">
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Priority:</strong> {book.priority}
            </p>
            <p>
              <strong>Published:</strong> {book.publicationDate}
            </p>
          </div>
          <div className="mt-6 flex gap-2">
            <Link href="/books" className="btn btn-ghost">
              Back
            </Link>
            <button className="btn btn-primary">Buy</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
