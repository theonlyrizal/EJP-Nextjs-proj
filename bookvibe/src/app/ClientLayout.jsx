'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="grow pt-16">{children}</main>
      <Footer />
    </>
  );
}
