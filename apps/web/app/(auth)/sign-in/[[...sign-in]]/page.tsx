import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-white shadow-lg rounded-lg',
            headerTitle: 'text-orange-600',
            headerSubtitle: 'text-gray-600',
            formButtonPrimary: 'bg-orange-600 hover:bg-orange-700',
          },
        }}
      />
    </div>
  );
}
