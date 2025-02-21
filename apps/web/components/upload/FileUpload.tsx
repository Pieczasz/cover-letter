'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUploadStore } from '../../lib/store/uploadStore';
import { uploadCV } from '../../lib/api-client';
import { useAuth } from '@clerk/nextjs';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
};

export const FileUpload = () => {
  const {
    setFile,
    setIsUploading,
    setProgress,
    setError,
    setSuccess,
    file,
    isUploading,
    progress,
    error,
    success,
  } = useUploadStore();

  const { getToken } = useAuth();

  const validateFile = (file: File) => {
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      throw new Error('Please upload a PDF or Word document');
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 2MB');
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        validateFile(file);
        setFile(file);
        setError(null);
        setSuccess(false);
        setIsUploading(true);
        setProgress(0);

        const token = await getToken();
        if (!token) {
          throw new Error('Authentication token is missing');
        }
        await uploadCV(file, token, (progress) => setProgress(progress));

        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    },
    [getToken /*, ...other dependencies if needed*/],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES,
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
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
          <UploadCloud
            className={`w-12 h-12 ${isUploading ? 'text-gray-400' : 'text-orange-500'}`}
          />
          <p className="text-lg text-gray-600 mb-2">
            {file ? file.name : 'Drag and drop your CV here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <Button
            disabled={isUploading}
            className="bg-orange-500 hover:bg-orange-600"
          >
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

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
              CV uploaded successfully!
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Supported formats: PDF, DOCX, DOC (max 2MB)
          </p>
        </div>
      </div>
    </div>
  );
};
