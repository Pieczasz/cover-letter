// TypeScript
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';

@Controller('upload')
@UseGuards(ClerkAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }
    return this.uploadService.uploadFile(file, userId);
  }
}
