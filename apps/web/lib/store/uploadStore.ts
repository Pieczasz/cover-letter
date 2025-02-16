import { create } from 'zustand';

interface UploadStore {
  file: File | null;
  isUploading: boolean;
  progress: number;
  error: string | null;
  setFile: (file: File | null) => void;
  setIsUploading: (isUploading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  file: null,
  isUploading: false,
  progress: 0,
  error: null,
  setFile: (file) => set({ file }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
}));
