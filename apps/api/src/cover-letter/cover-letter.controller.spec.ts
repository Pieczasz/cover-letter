import { Test, TestingModule } from '@nestjs/testing';
import { CoverLetterController } from './cover-letter.controller';
import { CoverLetterService } from './cover-letter.service';
import { ConfigService } from '@nestjs/config';

describe('CoverLetterController', () => {
  let controller: CoverLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoverLetterController],
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

    controller = module.get<CoverLetterController>(CoverLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
