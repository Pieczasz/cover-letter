import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CvModule } from './cv/cv.module';
import { JobsModule } from './jobs/jobs.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [LinksModule, UsersModule, CvModule, JobsModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
