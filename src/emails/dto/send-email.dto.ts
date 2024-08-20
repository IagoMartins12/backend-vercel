import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty()
  to: string;
}
