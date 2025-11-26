'use client';
import React, { useState, useContext } from 'react';
import useAxios, { authHeadersFromUser } from '@/hooks/useAxios';
import AuthContext from '@/context/AuthContext/AuthContext';

export default function AddBookForm({ onSuccess }) {
  const { user } = useContext(AuthContext) || {};
  const axios = useAxios();

  const [form, setForm] = useState({
    title: '',
    author: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    publicationDate: '',
    priority: 'medium',
    image: '',
    category: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const headers = await authHeadersFromUser(user);
      const payload = {
        title: form.title,
        author: form.author,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: form.price,
        publicationDate: form.publicationDate,
        priority: form.priority,
        image: form.image,
        category: form.category,
        createdAt: new Date().toISOString(),
      };
      const res = await axios.post('/books', payload, { headers });
      setMessage('Product added successfully.');
      onSuccess && onSuccess(res.data);
      setForm({
        title: '',
        author: '',
        shortDescription: '',
        fullDescription: '',
        price: '',
        publicationDate: '',
        priority: 'medium',
        image: '',
        category: '',
      });
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Add book failed', err);
      setMessage(err.response?.data?.message || 'Failed to add book');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4 max-w-2xl">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        className="input input-bordered w-full"
        required
      />
      <input
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
        placeholder="Author"
        className="input input-bordered w-full"
        required
      />
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select Category</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Mystery">Mystery</option>
        <option value="Thriller">Thriller</option>
        <option value="Romance">Romance</option>
        <option value="Horror">Horror</option>
        <option value="Historical Fiction">Historical Fiction</option>
        <option value="Adventure">Adventure</option>
        <option value="Biography">Biography</option>
        <option value="Self-Help">Self-Help</option>
        <option value="Business">Business</option>
        <option value="Poetry">Poetry</option>
        <option value="Drama">Drama</option>
        <option value="Young Adult">Young Adult</option>
        <option value="Children">Children&apos;s</option>
        <option value="Non-Fiction">Non-Fiction</option>
      </select>
      <input
        value={form.shortDescription}
        onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
        placeholder="Short description"
        className="input input-bordered w-full"
        required
      />
      <textarea
        value={form.fullDescription}
        onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
        placeholder="Full description"
        className="textarea textarea-bordered w-full"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          type="number"
          step="0.01"
          className="input input-bordered w-full"
          required
        />
        <input
          value={form.publicationDate}
          onChange={(e) => setForm({ ...form, publicationDate: e.target.value })}
          type="date"
          className="input input-bordered w-full"
          required
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
        defaultValue="https://i.ibb.co.com/8tR0ppV/book.jpg"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="Image URL"
        className="input input-bordered w-full"
        required
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
              author: '',
              shortDescription: '',
              fullDescription: '',
              price: '',
              publicationDate: '',
              priority: 'medium',
              image: '',
              category: '',
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
