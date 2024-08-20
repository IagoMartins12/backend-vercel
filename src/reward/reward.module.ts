import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RewardService],
  controllers: [RewardController],
  exports: [RewardService, RewardModule],
})
export class RewardModule {}
