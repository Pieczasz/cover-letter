'use client';

import { SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Free</h3>
          <p className="text-3xl font-bold mb-6">$0</p>
          <ul className="space-y-3 mb-8">
            <li>✓ 1 cover letter generation</li>
            <li>✓ Basic templates</li>
            <li>✓ CV upload</li>
          </ul>
          <SignedOut>
            <SignInButton>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-orange-600">
          <h3 className="text-xl font-semibold mb-4">Basic</h3>
          <p className="text-3xl font-bold mb-6">$9.99/mo</p>
          <ul className="space-y-3 mb-8">
            <li>✓ 10 cover letters per day</li>
            <li>✓ Premium templates</li>
            <li>✓ Priority support</li>
          </ul>
          <Link
            href="/sign-up"
            className="block w-full bg-orange-600 text-white text-center py-2 rounded-lg hover:bg-orange-700"
          >
            Choose Basic
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Pro</h3>
          <p className="text-3xl font-bold mb-6">$29.99/mo</p>
          <ul className="space-y-3 mb-8">
            <li>✓ Unlimited cover letters</li>
            <li>✓ All premium features</li>
            <li>✓ Priority support</li>
            <li>✓ Custom branding</li>
          </ul>
          <Link
            href="/sign-up"
            className="block w-full bg-orange-600 text-white text-center py-2 rounded-lg hover:bg-orange-700"
          >
            Choose Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
