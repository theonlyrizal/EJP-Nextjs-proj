import FeaturedGrid from '@/components/Home/FeaturedGrid';
import Features from '@/components/Home/Features';
import Hero from '@/components/Home/Hero';
export default function Home() {
  return (
    <main className="container mx-auto py-0">
      <Hero />
      <Features />
      <FeaturedGrid/>
    </main>
  );
}
