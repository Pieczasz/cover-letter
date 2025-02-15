'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from '@clerk/clerk-react';
import { useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

export default function App() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExternalApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await axiosInstance.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch data';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center [&_button]:bg-blue-500 [&_button]:text-white [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-md">
      <SignedOut>
        <div className="flex flex-col gap-4">
          <SignInButton />
          <SignUpButton />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col gap-4 items-center justify-center">
          <button
            onClick={handleExternalApi}
            disabled={loading}
            className="disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Ping external API'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
