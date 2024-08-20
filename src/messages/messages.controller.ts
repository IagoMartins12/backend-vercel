import { Controller, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

class SendMessageDto {
  to: string;
  message: string;
}

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @IsPublic()
  @ApiOperation({
    summary: 'Sending order status update messages',
  })
  @Post('send')
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    const { to, message } = sendMessageDto;
    return this.messagesService.sendMessage(to, message);
  }
}
