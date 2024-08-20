import { Controller, Get, Post, Body, Param, Req, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetOrderDto } from './dto/get-order.dto';
import { GetOrder } from './dto/get-order';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Administrative route to get orders by date',
  })
  @Put('admin/date')
  @IsPublic()
  findAllByDate(@Body() getOrder: GetOrder) {
    return this.orderService.findAllByDate(getOrder.date);
  }

  @ApiOperation({
    summary: 'Administrative route to get all orders',
  })
  @ApiOkResponse({
    type: GetOrderDto,
    isArray: true,
  })
  @Get('admin')
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({
    summary: 'Administrative route to get orders by date',
  })
  @Get('estimativeDate')
  @IsPublic()
  findEstimativeDate() {
    return this.orderService.checkEstimateDate();
  }

  @ApiOkResponse({
    type: GetOrderDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Get all user orders',
  })
  @Get()
  findAllByUser(@Req() req: AuthRequest) {
    return this.orderService.findAllByUser(req.user);
  }

  @ApiOperation({
    summary: 'Get a unique order',
  })
  @ApiOkResponse({
    type: GetOrderDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new order',
  })
  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: AuthRequest) {
    return this.orderService.create(createOrderDto, req.user);
  }
}
