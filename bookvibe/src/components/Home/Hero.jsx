import SectionBody from '@/wrappers/SectionBody';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen h-screen m-0 p-0 flex flex-col justify-center items-center rounded-2xl"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
      <div className="px-20 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Discover your next great read
        </h1>
        <p className="mt-4 text-lg text-muted">
          Curated books across genres — find something that speaks to you.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/books" className="btn btn-primary btn-lg text-primary-content rounded-full">
            Browse Books
          </Link>
          <a href="#features" className="btn btn-ghost bg-transparent rounded-full">
            Learn More
          </a>
        </div>
      </div>
      {/* <div className="rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg"
          alt="Hero banner"
          className="w-full h-72 object-cover"
        />
      </div> */}
    </section>
  );
}
