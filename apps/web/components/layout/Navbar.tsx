import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            coverletter.dev
          </Link>
          <div className="flex gap-4 items-center">
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-orange-600"
            >
              Pricing
            </Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-gray-600 hover:text-orange-600"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
