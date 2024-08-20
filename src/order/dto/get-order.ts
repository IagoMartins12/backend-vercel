import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetOrder extends Order {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;
}
