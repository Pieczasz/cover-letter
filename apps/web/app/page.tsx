'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { CoverLetterForm } from '../components/forms/CoverLetterForm';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-20">
        <SignedIn>
          <CoverLetterForm />
        </SignedIn>
        <SignedOut>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Generate Perfect Cover Letters with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your job applications with personalized cover letters in
              seconds
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/sign-up">
                <Button>Get Started Free</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline">View Pricing</Button>
              </Link>
            </div>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
