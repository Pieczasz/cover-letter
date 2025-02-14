import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import { CvModule } from './cv/cv.module';
import { JobModule } from './job/job.module';
import { CoverLetterModule } from './cover-letter/cover-letter.module';
import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LinksModule,
    UsersModule,
    CvModule,
    JobModule,
    CoverLetterModule,
    AuthModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
