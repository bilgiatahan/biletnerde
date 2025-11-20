import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ticket Aggregator',
  description: 'Türkiye’deki tüm etkinlikler tek yerde',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='tr'>
      <body className={`${inter.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
