import { create } from 'zustand';

interface UploadState {
  file: File | null;
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
  setFile: (file: File | null) => void;
  setIsUploading: (isUploading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  isUploading: false,
  progress: 0,
  error: null,
  success: false,
  setFile: (file) => set({ file }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  reset: () =>
    set({
      file: null,
      isUploading: false,
      progress: 0,
      error: null,
      success: false,
    }),
}));
