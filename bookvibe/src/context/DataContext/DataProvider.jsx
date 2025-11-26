'use client';
import React, { useEffect, useState } from 'react';
import DataContext from './DataContext';
import useAxios from '@/hooks/useAxios';

export default function DataProvider({ children }) {
  const axiosInstance = useAxios();
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        if (!mounted) return;
        setBooksData(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Failed to fetch books', err);
        if (mounted) setBooksData([]);
      }
    };

    fetchBooks();
    return () => {
      mounted = false;
    };
  }, [axiosInstance]);

  return (
    <DataContext.Provider value={{ booksData, setBooksData }}>{children}</DataContext.Provider>
  );
}
