import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import {
  DocumentTextIcon,
  CodeBracketIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'AI-powered customization',
    description:
      'Our cutting-edge AI analyzes your data and the job description to craft a cover letter that perfectly matches your qualifications and the role. Say goodbye to generic applications – get a tailored letter every time, increasing your chances of landing that job.',
    icon: CpuChipIcon,
  },
  {
    title: 'Tailored for developers',
    description:
      'Created specifically for developers, our platform understands the unique skills and language of the tech industry. Whether you’re applying for a front-end, back-end, or full-stack position, the cover letters are designed to highlight your expertise in the most relevant way.',
    icon: CodeBracketIcon,
  },
  {
    title: 'Professional, ready-to-send templates',
    description:
      'We offer expertly crafted templates that are specifically designed to stand out to tech recruiters. With a focus on the right balance of technical skills and personal narrative, our templates are built to make your cover letter unforgettable.',
    icon: DocumentTextIcon,
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-24 bg-white" id="features">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              <feature.icon className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default FeaturesSection;
