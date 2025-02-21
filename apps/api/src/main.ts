import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DynamoDBService } from './database/dynamodb.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dynamoDBService = app.get(DynamoDBService);

  await dynamoDBService.createTables();
  await app.listen(3000);
}
bootstrap();
