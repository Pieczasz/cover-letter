import { Module } from '@nestjs/common';
import { ClerkStrategy } from './clerk.strategy';
import { PassportModule } from '@nestjs/passport';
import { ClerkClientProvider } from '../auth/clerk-client.provider';
import { ConfigModule } from '@nestjs/config';
import { DynamoDBModule } from '../database/dynamodb.module';

@Module({
  imports: [PassportModule, ConfigModule, DynamoDBModule],
  providers: [ClerkStrategy, ClerkClientProvider],
  exports: [PassportModule],
})
export class AuthModule {}
