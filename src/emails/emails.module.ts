import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';

@Module({
  imports: [PrismaModule],
  providers: [EmailsService],
  controllers: [EmailsController],
})
export class EmailsModule {}
