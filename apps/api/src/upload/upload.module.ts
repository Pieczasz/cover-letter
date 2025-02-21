import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { FileValidator } from './validators/file.validator';
import { CoverLetterService } from '../cover-letter/cover-letter.service';
import { CoverLetterModule } from '../cover-letter/cover-letter.module';

@Module({
  imports: [CoverLetterModule],
  controllers: [UploadController],
  providers: [UploadService, FileValidator, CoverLetterService],
})
export class UploadModule {}
