import { Test, TestingModule } from '@nestjs/testing';
import { CoverLetterService } from './cover-letter.service';
import { ConfigService } from '@nestjs/config';

describe('CoverLetterService', () => {
  let service: CoverLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoverLetterService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'AWS_REGION':
                  return 'mock-region';
                case 'AWS_ACCESS_KEY_ID':
                  return 'mock-key';
                case 'AWS_SECRET_ACCESS_KEY':
                  return 'mock-secret';
                case 'DYNAMODB_TABLE_COVER_LETTERS':
                  return 'mock-table';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CoverLetterService>(CoverLetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
