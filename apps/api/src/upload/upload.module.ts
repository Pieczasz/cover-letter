import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { FileValidator } from './validators/file.validator';

@Module({
  controllers: [UploadController],
  providers: [UploadService, FileValidator],
})
export class UploadModule {}
