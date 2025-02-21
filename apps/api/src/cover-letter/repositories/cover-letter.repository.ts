import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class CoverLetterRepository {
  private client: DynamoDBDocumentClient;
  private tableName: string;

  constructor(private readonly configService: ConfigService) {
    const dbClient = new DynamoDBClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.client = DynamoDBDocumentClient.from(dbClient);
    this.tableName = this.configService.get<string>(
      'DYNAMODB_TABLE_COVER_LETTERS',
    );
  }

  async save(userId: string, coverLetterId: string, data: any): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        userId,
        coverLetterId,
        data: JSON.stringify(data),
        createdAt: new Date().toISOString(),
      },
    };

    await this.client.send(new PutCommand(params));
  }

  async findByUserId(userId: string): Promise<any[]> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await this.client.send(new QueryCommand(params));
    return (
      result.Items?.map((item) => ({
        coverLetterId: item.coverLetterId,
        data: JSON.parse(item.data),
        createdAt: item.createdAt,
      })) || []
    );
  }
}
