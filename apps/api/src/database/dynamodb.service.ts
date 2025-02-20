import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoDBService {
  private client: DynamoDBDocumentClient;
  private tableName: string;

  constructor(private configService: ConfigService) {
    const dbClient = new DynamoDBClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.client = DynamoDBDocumentClient.from(dbClient);
    this.tableName = this.configService.get('DYNAMODB_TABLE_NAME');
  }

  async createTables(): Promise<void> {
    const tables: CreateTableCommandInput[] = [
      {
        TableName: process.env.DYNAMODB_TABLE_USERS,
        KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        TableName: process.env.DYNAMODB_TABLE_COVER_LETTERS,
        KeySchema: [{ AttributeName: 'coverLetterId', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'coverLetterId', AttributeType: 'S' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        TableName: process.env.DYNAMODB_TABLE_JOB_APPLICATIONS,
        KeySchema: [{ AttributeName: 'applicationId', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'applicationId', AttributeType: 'S' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        TableName: process.env.DYNAMODB_TABLE_SUBSCRIPTIONS,
        KeySchema: [{ AttributeName: 'subscriptionId', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'subscriptionId', AttributeType: 'S' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      },
    ];

    for (const table of tables) {
      try {
        console.log(`Creating table: ${table.TableName}`);
        await this.client.send(new CreateTableCommand(table));
        console.log(`Created table: ${table.TableName}`);
      } catch (error: any) {
        if (error?.name === 'ResourceInUseException') {
          console.log(`⚠️ Table ${table.TableName} already exists`);
        } else {
          console.error(`Error creating table ${table.TableName}:`, error);
        }
      }
    }
  }

  async createUser(userId: string, name: string, email: string) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: { userId, name, email },
    });

    await this.client.send(command);
    return { userId, name, email };
  }

  async getUser(userId: string) {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { userId },
    });

    const response = await this.client.send(command);
    return response.Item;
  }
}
