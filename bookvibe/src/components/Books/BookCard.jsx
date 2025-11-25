import Link from 'next/link';

export default function BookCard({ book }) {
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
          <Link href={`/books/${book.id}`} className="btn btn-sm btn-outline">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
