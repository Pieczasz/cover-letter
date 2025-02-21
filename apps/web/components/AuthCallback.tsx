'use client';

import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';

export function AuthCallback() {
  console.log('AuthCallback rendering');
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    console.log('AuthCallback mounted:', { isSignedIn, user });
    const createUser = async () => {
      try {
        if (!isSignedIn || !user) return;

        const token = await getToken();
        console.log('Fetched token:', token);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: user.id,
              name: user.fullName,
              email: user.primaryEmailAddress?.emailAddress || '',
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to create user: ${response.statusText}`);
        }
        console.log('User created successfully.');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };

    createUser();
  }, [isSignedIn, user, getToken]);

  return null;
}
