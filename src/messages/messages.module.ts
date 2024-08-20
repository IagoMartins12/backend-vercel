import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
// import { VenomBotModule } from 'src/venom-bot/venom_bot.module';

@Module({
  // imports: [VenomBotModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
