'use client';
import React from 'react';
import { FaDiscord, FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-100 text-base-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <h1 className="text-2xl text-bold">BookVibe</h1>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="" className="text-3xl text-">
          <FaTwitter />
        </a>
        <a href="" className="text-3xl">
          <FaFacebook />
        </a>
        <a href="https://github.com/theonlyrizal" target="_blank" className="text-3xl">
          <FaGithub />
        </a>
      </nav>
    </footer>
  );
}
