import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilProvider from '@/app/config/RecoilProvider';
import ReactQueryProvider from '@/app/config/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </RecoilProvider>
    </ReactQueryProvider>
  );
}
