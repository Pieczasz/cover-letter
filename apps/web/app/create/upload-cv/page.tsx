import React from 'react';
import MaxWidthWrapper from '../../../components/layout/MaxWidthWrapper';
import { FileUpload } from '../../../components/upload/FileUpload';

const UploadCVPage = () => {
  return (
    <div className="min-h-[85vh] bg-slate-50">
      <MaxWidthWrapper>
        <div className="py-10">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                1
              </div>
              <span className="text-gray-600">/</span>
              <div className="text-gray-400">4</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-4">
            Upload your CV
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Let's start by analyzing your CV to create a personalized cover
            letter
          </p>

          <div className="max-w-2xl mx-auto">
            <FileUpload />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default UploadCVPage;
