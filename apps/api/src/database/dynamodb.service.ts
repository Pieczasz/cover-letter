import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBService {
  private client: DynamoDBDocumentClient;

  constructor(private configService: ConfigService) {
    // Create a low-level DynamoDB client with region and credentials.
    const dbClient = new DynamoDBClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    // Use the document client for easier interaction with DynamoDB.
    this.client = DynamoDBDocumentClient.from(dbClient);
  }

  // Creates the necessary tables if they do not yet exist.
  async createTables(): Promise<void> {
    const tables: CreateTableCommandInput[] = [
      {
        TableName: this.configService.get<string>('DYNAMODB_TABLE_USERS'),
        KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
        BillingMode: 'PAY_PER_REQUEST',
      },
      {
        TableName: this.configService.get<string>(
          'DYNAMODB_TABLE_COVER_LETTERS',
        ),
        KeySchema: [{ AttributeName: 'coverLetterId', KeyType: 'HASH' }],
        AttributeDefinitions: [
          { AttributeName: 'coverLetterId', AttributeType: 'S' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
      },
      // Add more tables (e.g. for job applications) as needed.
    ];

    for (const table of tables) {
      try {
        console.log(`Creating table: ${table.TableName}`);
        await this.client.send(new CreateTableCommand(table));
        console.log(`✅ Created table: ${table.TableName}`);
      } catch (error: any) {
        // If the table already exists, log and continue
        if (error?.name === 'ResourceInUseException') {
          console.log(`Table already exists: ${table.TableName}`);
        } else {
          throw error;
        }
      }
    }
  }

  // Store user metadata in the USERS table.
  async createUser(userId: string, name: string, email: string) {
    console.log('Creating user in DynamoDB:', { userId, name, email });
    const command = new PutCommand({
      TableName: this.configService.get<string>('DYNAMODB_TABLE_USERS'),
      Item: { userId, name, email, createdAt: new Date().toISOString() },
    });
    await this.client.send(command);
    return { userId, name, email };
  }

  // Link a cover letter file stored in S3 to the user by saving an entry
  // in the COVER_LETTERS table.
  async saveCoverLetter(userId: string, coverLetterId: string, s3Key: string) {
    const command = new PutCommand({
      TableName: this.configService.get<string>('DYNAMODB_TABLE_COVER_LETTERS'),
      Item: {
        coverLetterId,
        userId,
        s3Key,
        createdAt: new Date().toISOString(),
      },
    });
    return this.client.send(command);
  }

  // Retrieve all cover letters for a specific user.
  async getUserCoverLetters(userId: string) {
    const command = new QueryCommand({
      TableName: this.configService.get<string>('DYNAMODB_TABLE_COVER_LETTERS'),
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    });
    return this.client.send(command);
  }

  // Retrieve user metadata from the USERS table.
  async getUser(userId: string) {
    const command = new GetCommand({
      TableName: this.configService.get<string>('DYNAMODB_TABLE_USERS'),
      Key: { userId },
    });

    const response = await this.client.send(command);
    return response.Item;
  }
}
