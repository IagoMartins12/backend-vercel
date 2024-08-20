import { Module } from '@nestjs/common';
import { VenomBotController } from './venom_bot.controller';
import { VenomBotService } from './venom_bot.service';

@Module({
  controllers: [VenomBotController],
  providers: [VenomBotService],
  exports: [VenomBotService],
})
export class VenomBotModule {}
