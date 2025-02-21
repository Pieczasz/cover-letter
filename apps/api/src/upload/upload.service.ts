import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileValidator } from './validators/file.validator';
import { CoverLetterService } from '../cover-letter/cover-letter.service';

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor(
    private configService: ConfigService,
    private fileValidator: FileValidator,
    private coverLetterService: CoverLetterService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, userId: string) {
    this.fileValidator.validateFile(file);

    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const key = `users/${userId}/cvs/${Date.now()}-${file.originalname}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      await this.coverLetterService.saveCoverLetter(
        userId,
        Date.now().toString(),
        key,
      );

      return {
        key,
        url: `https://${bucketName}.s3.amazonaws.com/${key}`,
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Error uploading file');
    }
  }
}
