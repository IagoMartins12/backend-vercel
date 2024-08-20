import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsNumber()
  value: number;

  @ApiPropertyOptional()
  @IsString()
  category_id: string;

  @ApiPropertyOptional()
  @IsString()
  product_image: string;
}
