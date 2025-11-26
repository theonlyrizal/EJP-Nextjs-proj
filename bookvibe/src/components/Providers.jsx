'use client';
import React from 'react';
import AuthProvider from '@/context/AuthContext/AuthProvider';

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
