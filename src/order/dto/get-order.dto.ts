import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cart_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  order_data: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state_id: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  delivery_man_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    description: '0 = Entrega / 1 = Retirada no balcão',
  })
  @IsNotEmpty()
  @IsString()
  type_delivery: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type_pagament_id: string;

  @ApiPropertyOptional()
  @IsString()
  discount_coupon_id?: string;

  @ApiPropertyOptional()
  @IsNumber()
  discount_value?: number;

  @ApiPropertyOptional()
  @IsString()
  reward_id?: string;

  @ApiPropertyOptional()
  @IsString()
  address_id?: string;

  @ApiPropertyOptional()
  @IsString()
  contact_phone?: string;
}
