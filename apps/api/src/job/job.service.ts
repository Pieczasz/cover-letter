import { Injectable } from '@nestjs/common';

@Injectable()
export class JobService {
  processJobDescription(jobDescription: string): any {
    // TODO: Implement job description processing logic
    return { message: 'Job description processed', data: jobDescription };
  }
}
