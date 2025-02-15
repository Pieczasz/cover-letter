import { ClerkProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cover Letter Generator For Developers',
  description: 'Generate a cover letter for your next job application.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      >
        <body className={inter.className}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
