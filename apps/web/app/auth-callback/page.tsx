'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCallback } from '../../components/AuthCallback';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after a short delay to allow AuthCallback to complete
    const timeout = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      <AuthCallback />
      <p>Setting up your account...</p>
    </div>
  );
}
