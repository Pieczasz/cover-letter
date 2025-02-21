// src/database/dynamodb.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DynamoDBService } from './dynamodb.service';
import { CreateTableCommandOutput } from '@aws-sdk/client-dynamodb';

describe('DynamoDBService', () => {
  let service: DynamoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DynamoDBService,
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
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DynamoDBService>(DynamoDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('should create tables', async () => {
    const mockResponse: CreateTableCommandOutput = {
      $metadata: {},
      TableDescription: {
        TableName: 'test-table',
        TableStatus: 'ACTIVE',
      },
    };

    const createTableSpy = jest
      .spyOn(service['client'], 'send')
      .mockResolvedValue(mockResponse);

    await service.createTables();
    expect(createTableSpy).toHaveBeenCalled();
  });
  */
});
