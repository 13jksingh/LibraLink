'use client'
import React, { useState, useEffect } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve dark mode state from local storage on component mount
    const storedDarkMode = localStorage.getItem('darkMode');
    setIsDarkMode(storedDarkMode === 'true');
  }, []);

  useEffect(() => {
    // Update local storage when dark mode state changes
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const {props:{childProp:{segment}}} = children;

  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className={`dark:bg-[#353334] dark:text-white ${inter.className}`}>
        <Navbar toggleDarkMode={toggleDarkMode} />
        <div className="flex">
          <Sidebar segment={segment} />
          <div className="dark:bg-[#201C1D] bg-[#F9F9F9] rounded-tl-3xl w-screen px-10 py-20">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
