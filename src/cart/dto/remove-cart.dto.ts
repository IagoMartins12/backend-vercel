import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RemoveCartDto extends Cart {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cart_product_id: string;
}
