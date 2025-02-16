'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div className="border-t border-gray-200 last:border-b">
      <button
        className="w-full py-4 flex justify-between items-center hover:text-orange-600 transition-colors"
        onClick={onClick}
      >
        <h3 className="font-semibold text-left text-lg">{question}</h3>
        <ChevronDownIcon
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="pb-4 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export const Accordion = ({
  items,
}: {
  items: { question: string; answer: string }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-gray-200">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};
