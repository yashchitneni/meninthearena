/**
 * Root layout component for the application.
 * @module app/layout
 */

import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import ClientPopupDialogWrapper from '@/components/ClientPopupDialogWrapper';

const inter = Inter({ subsets: ['latin'] });

/**
 * Root layout component that wraps all pages.
 * @function RootLayout
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${inter.className}`}>
        <Navigation />
        <main className="w-full">
          {children}
        </main>
        <ClientPopupDialogWrapper />
      </body>
    </html>
  );
}