import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderStateId: string;

  @ApiProperty()
  @IsOptional()
  deliveryManId?: string;

  @ApiProperty()
  @IsOptional()
  sendMessage?: boolean;
}
