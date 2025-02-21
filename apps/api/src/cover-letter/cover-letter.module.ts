import { Module } from '@nestjs/common';
import { CoverLetterController } from './cover-letter.controller';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterRepository } from './repositories/cover-letter.repository';

@Module({
  controllers: [CoverLetterController],
  providers: [CoverLetterService, CoverLetterRepository],
  exports: [CoverLetterService, CoverLetterRepository],
})
export class CoverLetterModule {}
