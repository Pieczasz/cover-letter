// dynamodb.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DynamoDBService } from './dynamodb.service';

describe('DynamoDBService', () => {
  let service: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DynamoDBService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const values = {
                AWS_REGION: 'us-east-1',
                AWS_ACCESS_KEY_ID: 'test-key',
                AWS_SECRET_ACCESS_KEY: 'test-secret',
                DYNAMODB_TABLE_USERS: 'test-users',
                DYNAMODB_TABLE_COVER_LETTERS: 'test-cover-letters',
              };
              return values[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DynamoDBService>(DynamoDBService);
    // Mock the DynamoDB client methods
    const mockSend = jest.fn().mockResolvedValue({});
    service['client'].send = mockSend;
  });
});
