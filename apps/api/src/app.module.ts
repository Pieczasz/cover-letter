import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { CvModule } from './cv/cv.module';
import { JobModule } from './job/job.module';
import { CoverLetterModule } from './cover-letter/cover-letter.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ClerkClientProvider } from './auth/clerk-client.provider';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { DynamoDBService } from './database/dynamodb.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LinksModule,
    CvModule,
    JobModule,
    CoverLetterModule,
    AuthModule,
    AiModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    ClerkClientProvider,
    DynamoDBService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  exports: [DynamoDBService],
})
export class AppModule {}
