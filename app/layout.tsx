import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { appMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import './globals.css';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-public-sans',
});

export const metadata: Metadata = {
  ...appMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="OBF" />
      </head>
      <body className={`${publicSans.variable} antialiased p-4 md:p-6`}>
        <main className="flex flex-col min-h-screen space-y-4 md:space-y-6">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
