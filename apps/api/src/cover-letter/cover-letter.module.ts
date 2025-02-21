import { Module } from '@nestjs/common';
import { CoverLetterController } from './cover-letter.controller';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterRepository } from './repositories/cover-letter.repository';
import { FileValidator } from '../upload/validators/file.validator';

@Module({
  controllers: [CoverLetterController],
  providers: [CoverLetterService, CoverLetterRepository, FileValidator],
})
export class CoverLetterModule {}
