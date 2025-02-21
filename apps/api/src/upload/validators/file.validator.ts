import { Injectable } from '@nestjs/common';

@Injectable()
export class FileValidator {
  private readonly MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  private readonly ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  validateFile(file: Express.Multer.File): void {
    this.validateFileType(file);
    this.validateFileSize(file);
  }

  private validateFileType(file: Express.Multer.File): void {
    if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
      throw new Error(
        'Invalid file type. Only PDF and Word documents are allowed.',
      );
    }
  }

  private validateFileSize(file: Express.Multer.File): void {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(
        `File size too large. Maximum size is ${this.MAX_FILE_SIZE / 1024 / 1024}MB`,
      );
    }
  }
}
