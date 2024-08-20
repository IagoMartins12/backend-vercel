import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { GetCouponDto } from './dto/get-coupon.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @ApiOperation({
    summary: 'Get all coupons',
  })
  @ApiOkResponse({
    type: GetCouponDto,
    isArray: true,
  })
  @Get('')
  @IsPublic()
  findAllAdmin() {
    return this.couponsService.findAll();
  }

  @ApiOperation({
    summary: 'Get unique coupon',
  })
  @ApiOkResponse({
    type: GetCouponDto,
  })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOneAdmin(id);
  }

  @ApiOperation({
    summary: 'Get user available coupons',
  })
  @ApiOkResponse({
    type: GetCouponDto,
    isArray: true,
  })
  @ApiBearerAuth()
  @Get('/user')
  findAll(@Req() req: AuthRequest) {
    return this.couponsService.findAllByUser(req.user);
  }

  @ApiOperation({
    summary: 'Administrative route to create coupon',
  })
  @ApiBearerAuth()
  @Post('admin')
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @ApiOperation({
    summary: 'Administrative route to update coupon',
  })
  @ApiBearerAuth()
  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() updateCouponDto: any) {
    return this.couponsService.update(id, updateCouponDto);
  }

  @ApiOperation({
    summary: 'Administrative route to delete coupon',
  })
  @ApiBearerAuth()
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}
