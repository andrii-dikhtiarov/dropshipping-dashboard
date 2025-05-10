import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/header';
import type React from 'react';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ship With Me Now',
  description: 'Dropshipping Dashboard',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex h-full flex-col`}>
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/50">
          <div className="container mx-auto py-8">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}

import './globals.css';
