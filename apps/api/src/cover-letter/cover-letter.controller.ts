import { Controller, Post, Body } from '@nestjs/common';
import { CoverLetterService } from './cover-letter.service';

@Controller('cover-letter')
export class CoverLetterController {
  constructor(private readonly coverLetterService: CoverLetterService) {}

  @Post()
  generateCoverLetter(
    @Body()
    inputData: {
      // TODO: Implement the acutal cv type
      cv: any;
      github: string;
      linkedin: string;
      jobDescription: string;
    },
  ) {
    // Input includes CV data, GitHub, LinkedIn, and job description info
    return this.coverLetterService.generate(inputData);
  }
}
