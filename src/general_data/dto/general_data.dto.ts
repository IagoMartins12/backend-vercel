import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGeneralData {
  @ApiProperty()
  @IsString()
  openingHours: string;

  @ApiProperty()
  @IsString()
  closingHours: string;

  @ApiProperty()
  @IsString()
  cellphone: string;

  @ApiProperty()
  @IsString()
  cellphone2?: string;

  @ApiProperty()
  @IsString()
  telephone: string;

  @ApiProperty()
  @IsString()
  telephone2?: string;

  @ApiProperty()
  @IsBoolean()
  isOpening: boolean;

  @ApiProperty()
  @IsString()
  pixKey: string;

  @ApiProperty()
  @IsString()
  pixName: string;

  @ApiProperty()
  @IsNumber()
  deliveryFeeInside: number;

  @ApiProperty()
  @IsNumber()
  deliveryFeeOutside: number;
}
