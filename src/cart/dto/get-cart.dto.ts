import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCartDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiPropertyOptional()
  @IsString()
  product_id_2?: string;

  @ApiPropertyOptional()
  @IsString()
  product_id_3?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cart_id: string;

  @ApiPropertyOptional()
  @IsString()
  observation?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  size: number;
}
