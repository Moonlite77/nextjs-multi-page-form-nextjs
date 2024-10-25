import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThirdwebProvider } from "thirdweb/react";
import { NavBar } from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resume Vault',
  description: 'Get more out of your resume',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <div className="flex min-h-screen bg-black">
            <main className="flex-1 mr-16 p-4">
              {children}
            </main>
            <NavBar />
          </div>
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}