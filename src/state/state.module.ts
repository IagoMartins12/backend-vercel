import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessagesModule } from 'src/messages/messages.module';
import { RewardModule } from 'src/reward/reward.module';

@Module({
  imports: [PrismaModule, MessagesModule, RewardModule],
  providers: [StateService],
  controllers: [StateController],
  exports: [StateService],
})
export class StateModule {}
