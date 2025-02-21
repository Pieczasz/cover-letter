import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CoverLetterRepository } from './cover-letter.repository';

describe('CoverLetterRepository', () => {
  let repository: CoverLetterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoverLetterRepository,
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

    repository = module.get<CoverLetterRepository>(CoverLetterRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // Add more tests for save and findByUserId methods
});
