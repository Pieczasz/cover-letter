import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './links/links.module';
import { CvModule } from './cv/cv.module';
import { JobModule } from './job/job.module';
import { CoverLetterModule } from './cover-letter/cover-letter.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';
import { UserModule } from './user/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClerkClientProvider } from './auth/clerk-client.provider';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { DynamoDBService } from './database/dynamodb.service';
import { UploadModule } from './upload/upload.module';

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
    UserModule,
    UploadModule,
  ],
  controllers: [AppController],
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
