import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCouponDto } from './create-coupon.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetCouponDto extends PartialType(CreateCouponDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  active: number;

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
