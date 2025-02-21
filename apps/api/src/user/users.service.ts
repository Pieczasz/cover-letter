import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

@Injectable()
export class UserService {
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

  async createUser(userId: string, name: string, email: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      Item: {
        userId: { S: userId },
        name: { S: name },
        email: { S: email },
      },
    };
    await this.client.send(new PutItemCommand(params));
    return { userId, name, email };
  }
}
