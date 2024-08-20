import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cupom_name: string;

  @ApiProperty()
  @IsNotEmpty()
  expiration_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @ApiProperty({
    description: '0 - Cupom público / 1 - Cupom privado',
  })
  @IsNotEmpty()
  @IsNumber()
  type_coupon: number; //0 - public / 1 - private
}
