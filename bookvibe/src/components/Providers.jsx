'use client';
import React from 'react';
import AuthProvider from '@/context/AuthContext/AuthProvider';
import DataProvider from '@/context/DataContext/DataProvider';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <DataProvider>{children}</DataProvider>
    </AuthProvider>
  );
}
