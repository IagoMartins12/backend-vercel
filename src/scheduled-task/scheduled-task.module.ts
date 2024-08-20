import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
  imports: [PrismaModule],
  providers: [ScheduledTaskService],
})
export class ScheduledTaskModule {}
