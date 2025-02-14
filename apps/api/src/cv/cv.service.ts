import { Injectable } from '@nestjs/common';

@Injectable()
export class CvService {
  processCv(cvData: any): any {
    // TODO: Implement CV processing logic
    return { message: 'CV processed', data: cvData };
  }
}
