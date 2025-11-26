'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-lg text-muted mb-6">We couldn’t find the page you’re looking for.</p>
      <div className="flex justify-center gap-4">
        <Link href="/" className="btn btn-primary text-primary-content">
          Home
        </Link>
        <Link href="/books" className="btn btn-ghost">
          Browse Books
        </Link>
      </div>
    </main>
  );
}
