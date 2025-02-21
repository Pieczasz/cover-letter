// Create a new file: cover-letter.dto.ts
import { IsString } from 'class-validator';

export class GenerateCoverLetterDto {
  @IsString()
  cv: 'pdf' | 'docx';

  @IsString()
  github: string;

  @IsString()
  linkedin: string;

  @IsString()
  jobDescription: string;
}
