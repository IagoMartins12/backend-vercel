import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { GetCartDto } from 'src/cart/dto/get-cart.dto';
import { GetCouponDto } from 'src/coupons/dto/get-coupon.dto';
import { GetFavoriteDto } from 'src/favorites/dto/get-favorite.dto';
import { GetOrderDto } from 'src/order/dto/get-order.dto';
import { GetUserRewardDto } from 'src/reward/dto/get-user-reward.dto';
import { GetUserAddressDto } from 'src/user_address/dto/get-user_address.dto';

//Regras de criação de usuario
export class GetUserFullDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  points: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  Created_at: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_adress_id: string;

  @ApiProperty({
    description: '0 - Usuario / 1 - Admin',
  })
  @IsNotEmpty()
  @IsNumber()
  role: string;

  @ApiProperty({ type: [GetUserAddressDto] })
  @IsNotEmpty()
  user_address: GetUserAddressDto;

  @ApiProperty({ type: [GetUserRewardDto] })
  @IsNotEmpty()
  rewards: GetUserRewardDto;

  @ApiProperty({ type: [GetFavoriteDto] })
  @IsNotEmpty()
  favorites: GetFavoriteDto;

  @ApiProperty({ type: [GetCouponDto] })
  @IsNotEmpty()
  coupons: GetCouponDto;

  @ApiProperty({ type: [GetOrderDto] })
  @IsNotEmpty()
  orders: GetOrderDto;

  @ApiProperty({ type: [GetCartDto] })
  @IsNotEmpty()
  cartProducts: GetCartDto;
}
