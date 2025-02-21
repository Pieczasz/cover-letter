// src/upload/validators/file.validator.spec.ts
import { FileValidator } from './file.validator';

describe('FileValidator', () => {
  let validator: FileValidator;

  beforeEach(() => {
    validator = new FileValidator();
  });

  it('should accept valid file', () => {
    const file = {
      mimetype: 'application/pdf',
      size: 1024 * 1024, // 1MB
    } as Express.Multer.File;

    expect(() => validator.validateFile(file)).not.toThrow();
  });

  it('should throw error for invalid file type', () => {
    const file = {
      mimetype: 'image/jpeg',
      size: 1024 * 1024,
    } as Express.Multer.File;

    expect(() => validator.validateFile(file)).toThrow(
      'Invalid file type. Only PDF and Word documents are allowed.',
    );
  });

  it('should throw error for file too large', () => {
    const file = {
      mimetype: 'application/pdf',
      size: 3 * 1024 * 1024, // 3MB
    } as Express.Multer.File;

    expect(() => validator.validateFile(file)).toThrow(
      'File size too large. Maximum size is 2MB',
    );
  });
});
