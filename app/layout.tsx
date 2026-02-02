import { ConditionalLayout } from '@/components/ConditionalLayout';
import { appMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import { headers } from 'next/headers';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const isPayloadRoute = headersList.get('x-is-payload-route') === 'true';
  const pathname = headersList.get('x-pathname') ?? '';
  const isAdminPath = pathname.startsWith('/admin');

  // For Payload admin routes, don't render HTML/body - let Payload's RootLayout handle it.
  // Use pathname as fallback when middleware header isn't forwarded (e.g. some Next.js setups).
  if (isPayloadRoute || isAdminPath) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="OBF" />
      </head>
      <body className={`${publicSans.variable} antialiased p-4 md:p-6`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
