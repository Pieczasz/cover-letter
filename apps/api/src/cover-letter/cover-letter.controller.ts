import { Controller, Post, Body } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';
import { GenerateCoverLetterDto } from './cover-letter.dto';

@Controller('cover-letter')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @Post()
  generateCoverLetter(@Body() inputData: GenerateCoverLetterDto) {
    // TODO: Generate user cover letter
    // return this.coverLetterService.generate(inputData);
  }
}
