import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryManDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  delivery_man_name: string;
}
