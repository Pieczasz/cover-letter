import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { DynamoDBService } from './database/dynamodb.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('clerk'))
export class UsersController {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  @Post()
  async createUser(
    @Body() body: { userId: string; name: string; email: string },
    @Request() req,
  ) {
    return await this.dynamoDBService.createUser(
      body.userId,
      body.name,
      body.email,
    );
  }
}
