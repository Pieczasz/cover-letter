import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoverLetterRepository } from './repositories/cover-letter.repository';

@Injectable()
export class CoverLetterService {
  constructor(
    private readonly configService: ConfigService,
    private readonly coverLetterRepository: CoverLetterRepository,
  ) {}

  async saveCoverLetter(
    userId: string,
    coverId: string,
    s3Key: string,
  ): Promise<void> {
    await this.coverLetterRepository.save(userId, coverId, {
      s3Key,
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
    });
  }

  async getUserCoverLetters(userId: string): Promise<any[]> {
    return this.coverLetterRepository.findByUserId(userId);
  }
}
