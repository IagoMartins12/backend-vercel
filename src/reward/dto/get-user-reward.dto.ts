import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetUserRewardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reward_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardImage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rewardPoints: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rewardType: number;

  @ApiPropertyOptional()
  @IsNumber()
  rewardDiscount: number;

  @ApiPropertyOptional()
  @IsString()
  rewardProductId: string;
}
