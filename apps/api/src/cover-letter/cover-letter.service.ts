import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class CoverLetterService {
  private client: DynamoDBClient;
  private tableName: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new DynamoDBClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.tableName = this.configService.get('DYNAMODB_TABLE_USERS');
  }

  async saveCoverLetter(
    userId: string,
    coverId: string,
    s3Key: string,
  ): Promise<any> {
    const params = {
      TableName: this.tableName,
      Item: {
        userId: { S: userId },
        coverId: { S: coverId },
        s3Key: { S: s3Key },
      },
    };
    return this.client.send(new PutItemCommand(params));
  }

  async getUserCoverLetters(userId: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: {
        ':uid': { S: userId },
      },
    };
    const result = await this.client.send(new QueryCommand(params));
    return result.Items;
  }
}
