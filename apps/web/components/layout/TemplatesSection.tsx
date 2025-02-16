import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Image from 'next/image';
import { Button } from '../ui/Button';

const TemplatesSection = () => {
  return (
    <div className="py-24 bg-slate-50" id="templates">
      <MaxWidthWrapper>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Professional Templates</h2>
          <p className="text-xl text-gray-600">
            Choose from our collection of professionally designed templates
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={`/template${i}.png`}
                  alt={`Template ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Professional Template {i}
                </h3>
                <Button variant="outline" className="w-full">
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TemplatesSection;
