import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRewardUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardId: string;
}

export class CreateRewardDto {
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
  @IsOptional()
  product_id?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  type_reward: number; //0 - Desconto / 1 - Produto
}
