import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../entities/cart.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDto extends Cart {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  product_id_2?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  product_id_3?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
}
