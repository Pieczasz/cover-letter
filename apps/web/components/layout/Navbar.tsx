'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from '../ui/Button';

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative text-gray-600 hover:text-orange-600 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
        isActive ? 'text-orange-600 after:scale-x-100' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <MaxWidthWrapper>
          <div className="flex justify-between items-center">
            <div className="w-32">
              <Link href="/" className="text-2xl font-bold text-orange-600">
                coverletter.dev
              </Link>
            </div>
            <div className="flex-1 flex justify-center gap-8 items-center">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
            <div className="w-32 flex justify-end">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
              </SignedOut>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </nav>
  );
}
