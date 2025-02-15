import { Controller, Post, Body } from '@nestjs/common';
import { CvService } from './cv.service';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  uploadCv(@Body() cvData: any) {
    // TODO: Process the CV data here (this might involve validation, storage, etc.)
    return this.cvService.processCv(cvData);
  }
}
