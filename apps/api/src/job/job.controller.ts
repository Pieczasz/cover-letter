import { Controller, Post, Body } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  submitJobDescription(@Body() jobDescription: string) {
    // TODO: Process the job description here
    return this.jobService.processJobDescription(jobDescription);
  }
}
