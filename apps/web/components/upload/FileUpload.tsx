'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/Button';
import { useUploadStore } from '../../lib/store/uploadStore';

export const FileUpload = () => {
  const {
    setFile,
    setIsUploading,
    setProgress,
    setError,
    file,
    isUploading,
    progress,
    error,
  } = useUploadStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    setFile(file);
    setError(null);
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setProgress(100);
      // You might want to store the S3 URL in your state management
      console.log('File uploaded successfully:', data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 transition-colors ${
        isDragActive
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-300 hover:border-orange-500'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <p className="text-lg text-gray-600 mb-2">
          {file ? file.name : 'Drag and drop your CV here'}
        </p>
        <p className="text-sm text-gray-500 mb-4">or</p>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Choose file
        </Button>
        {isUploading && (
          <div className="w-full max-w-xs mt-4">
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="text-sm text-gray-500 mt-4">
          Supported formats: PDF, DOCX, DOC
        </p>
      </div>
    </div>
  );
};
