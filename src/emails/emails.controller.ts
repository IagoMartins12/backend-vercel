import { Body, Controller, Post } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@IsPublic()
@ApiTags('emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailService: EmailsService) {}

  @ApiOperation({
    summary: 'Confirm email (Not used)',
  })
  @Post('confirmEmail')
  confirmEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.confirmEmail(sendEmailDto);
  }

  @ApiOperation({
    summary: 'Recover password',
  })
  @Post('recoverPassword')
  recoverPassword(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.recoverPassword(sendEmailDto);
  }
}
