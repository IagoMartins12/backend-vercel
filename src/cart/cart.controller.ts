import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveCartDto } from './dto/remove-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Get cart data',
  })
  @ApiOkResponse({
    type: GetCartDto,
    isArray: true,
  })
  @Get('/products')
  findAll(@Req() req: AuthRequest) {
    return this.cartService.findProduct(req.user);
  }

  @ApiOperation({
    summary: 'Add item to a cart',
  })
  @Post('/add')
  create(@Req() req: AuthRequest, @Body() createCartDto: CreateCartDto) {
    return this.cartService.addProduct(req.user, createCartDto);
  }

  @ApiOperation({
    summary: 'Update item from a cart',
  })
  @Put('/update')
  update(@Req() req: AuthRequest, @Body() updateCartDto: UpdateCartDto) {
    console.log('body', updateCartDto);
    return this.cartService.attProduct(updateCartDto);
  }

  @ApiOperation({
    summary: 'Delete item from a cart',
  })
  @Delete('/delete')
  delete(@Body() removeCartDto: RemoveCartDto) {
    return this.cartService.removeProduct(removeCartDto);
  }

  @ApiOperation({
    summary: 'Administrative route to find order data',
  })
  @ApiOkResponse({
    type: GetCartDto,
    isArray: true,
  })
  @Get('admin/:id')
  findCart(@Param('id') id: string) {
    return this.cartService.findOrder(id);
  }
}
