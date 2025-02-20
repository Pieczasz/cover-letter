import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DynamoDBService } from './database/dynamodb.service';

@Controller('users')
export class UserController {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  @Post()
  async createUser(
    @Body() body: { userId: string; name: string; email: string },
  ) {
    return this.dynamoDBService.createUser(body.userId, body.name, body.email);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.dynamoDBService.getUser(userId);
  }
}
