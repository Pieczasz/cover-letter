import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class CoverLetterRepository {
  private client: DynamoDBClient;
  private tableName: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new DynamoDBClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.tableName = this.configService.get<string>(
      'DYNAMODB_TABLE_COVER_LETTERS',
    );
  }

  async save(userId: string, coverId: string, data: any): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        userId: { S: userId },
        coverId: { S: coverId },
        data: { S: JSON.stringify(data) },
        createdAt: { S: new Date().toISOString() },
      },
    };

    await this.client.send(new PutItemCommand(params));
  }

  async findByUserId(userId: string): Promise<any[]> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': { S: userId },
      },
    };

    const result = await this.client.send(new QueryCommand(params));
    return (
      result.Items?.map((item) => ({
        coverId: item.coverId.S,
        data: JSON.parse(item.data.S),
        createdAt: item.createdAt.S,
      })) || []
    );
  }
}
