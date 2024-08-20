import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto extends Order {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    description: '0 = Entrega / 1 = Retirada no balcão',
  })
  @IsNotEmpty()
  @IsNumber()
  type_delivery: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type_pagament_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  discount_coupon_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  discount_value?: number;

  @ApiPropertyOptional()
  @IsOptional()
  reward_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  contact_phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  template?: string;
}
