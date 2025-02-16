import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-8 mb-4">
          <Link href="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact Us
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
        </nav>
        <div className="text-center text-gray-600 text-sm">
          <p>© {currentYear} Cover Letter Generator. All rights reserved.</p>
          <p className="mt-2">
            Open source software licensed under{' '}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-600/80"
            >
              AGPL-3.0
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
