import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetRewardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity_points: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiPropertyOptional()
  @IsString()
  product_id?: string;

  @ApiPropertyOptional()
  @IsNumber()
  discount?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  type_reward: number; //0 - Desconto / 1 - Produto
}
