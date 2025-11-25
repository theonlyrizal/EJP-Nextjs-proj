'use client';
import React, { useState } from 'react';

export default function AddBookForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    publicationDate: '',
    priority: 'medium',
    image: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // UI-only: simulate delay and success
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setMessage('Product added successfully (UI-only).');
    onSuccess && onSuccess(form);
    setForm({
      title: '',
      shortDescription: '',
      fullDescription: '',
      price: '',
      publicationDate: '',
      priority: 'medium',
      image: '',
    });
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <form onSubmit={submit} className="grid gap-4 max-w-2xl">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="input input-bordered w-full"
      />
      <input
        value={form.shortDescription}
        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
        placeholder="Short description"
        className="input input-bordered w-full"
      />
      <textarea
        value={form.fullDescription}
        onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
        placeholder="Full description"
        className="textarea textarea-bordered w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="input input-bordered w-full"
        />
        <input
          value={form.publicationDate}
          onChange={(e) => setForm({ ...form, publicationDate: e.target.value })}
          type="date"
          className="input input-bordered w-full"
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="select select-bordered w-full"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>
      <input
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="Image URL (optional)"
        className="input input-bordered w-full"
      />
      <div className="flex gap-2">
        <button className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Adding...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={() =>
            setForm({
              title: '',
              shortDescription: '',
              fullDescription: '',
              price: '',
              publicationDate: '',
              priority: 'medium',
              image: '',
            })
          }
          className="btn btn-ghost"
        >
          Reset
        </button>
      </div>
      {message && <div className="alert alert-success mt-2">{message}</div>}
    </form>
  );
}
