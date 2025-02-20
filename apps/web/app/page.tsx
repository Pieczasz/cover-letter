import { Suspense } from 'react';
import Image from 'next/image';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';
import { Button } from '@repo/ui/button';

const Gradient = ({
  conic,
  className,
  small,
}: Readonly<{
  small?: boolean;
  conic?: boolean;
  className?: string;
}>) => {
  return (
    <span
      className={`${
        small ? 'h-20 w-20' : 'h-[500px] w-[500px]'
      } absolute rounded-full ${
        conic ? 'bg-gradient-conic' : 'bg-gradient-radial'
      } from-sky-400 to-blue-800 blur-2xl ${className}`}
    />
  );
};

type Link = {
  title: string;
  url: string;
  description: string;
};

const LinksSection = async () => {
  const fetchLinks = async (): Promise<Link[]> => {
    try {
      return await (await fetch('http://localhost:3000/links')).json();
    } catch (_) {
      return [];
    }
  };

  const links = await fetchLinks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
      {links.map(({ title, url, description }) => (
        <Card
          className="p-6 hover:bg-gray-50"
          href={url}
          key={title}
          title={title}
        >
          {description}
        </Card>
      ))}
    </div>
  );
};

const LinksSectionForTest = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
      <Card className="p-6 hover:bg-gray-50" href={'url'} title={'title'}>
        description
      </Card>
    </div>
  );
};

const RootPage = ({ params }: { params: { forTest?: boolean } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm flex">
        <p className="flex justify-center items-center gap-2">
          examples/
          <Code className="font-mono bg-gray-100 p-1 rounded">with-nestjs</Code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2"
          >
            By
            <Image
              alt="Vercel Logo"
              className="dark:invert"
              height={24}
              priority
              src="/vercel.svg"
              width={100}
            />
          </a>
        </div>
      </div>

      <Button
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        appName="web (with-nestjs)"
      >
        Click me!
      </Button>

      <div className="relative flex place-items-center">
        <div className="relative">
          <div className="absolute -z-10">
            <Image
              alt=""
              height={614}
              src="circles.svg"
              width={614}
              className="pointer-events-none"
            />
          </div>
          <div className="relative">
            <Gradient className="absolute" conic small />
          </div>

          <div className="relative">
            <Image
              alt="Turborepo"
              height={120}
              priority
              src="turborepo.svg"
              width={120}
              className="pointer-events-none"
            />
          </div>
        </div>

        <Gradient className="absolute" conic />

        <div className="relative mt-16">
          <svg
            className="h-12 w-auto dark:invert"
            viewBox="0 0 506 50"
            width={200}
            xmlns="http://www.w3.org/2000/svg"
          >
            // ...existing code for SVG path...
          </svg>
        </div>
      </div>

      {params.forTest ? (
        <LinksSectionForTest />
      ) : (
        <Suspense
          fallback={<div className="text-center">Loading links...</div>}
        >
          <LinksSection />
        </Suspense>
      )}
    </main>
  );
};

export default RootPage;
