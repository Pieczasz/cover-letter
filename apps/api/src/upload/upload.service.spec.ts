import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UploadService } from './upload.service';
import { FileValidator } from './validators/file.validator';

jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({
    send: jest.fn().mockResolvedValue({}),
  })),
  PutObjectCommand: jest.fn(),
}));

describe('UploadService', () => {
  let service: UploadService;
  let fileValidator: FileValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        FileValidator,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const values = {
                AWS_REGION: 'us-east-1',
                AWS_ACCESS_KEY_ID: 'test-key',
                AWS_SECRET_ACCESS_KEY: 'test-secret',
                AWS_BUCKET_NAME: 'test-bucket',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    fileValidator = module.get<FileValidator>(FileValidator);
  });

  describe('uploadFile', () => {
    it('should upload a valid file successfully', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 1024 * 1024, // 1MB
      } as Express.Multer.File;

      const result = await service.uploadFile(mockFile, 'test-user-id');

      expect(result).toHaveProperty('key');
      expect(result).toHaveProperty('url');
    });

    it('should throw error for invalid file type', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024 * 1024,
      } as Express.Multer.File;

      await expect(
        service.uploadFile(mockFile, 'test-user-id'),
      ).rejects.toThrow('Invalid file type');
    });

    it('should throw error for file too large', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 3 * 1024 * 1024, // 3MB
      } as Express.Multer.File;

      await expect(
        service.uploadFile(mockFile, 'test-user-id'),
      ).rejects.toThrow('File size too large');
    });
  });
});
