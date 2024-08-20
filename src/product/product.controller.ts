import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiOkResponse({
    type: CreateProductDto,
    isArray: true,
  })
  @IsPublic()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Get unique product',
  })
  @ApiOkResponse({
    type: CreateProductDto,
  })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @ApiOperation({
    summary: 'Administrative route to create a new product',
  })
  @ApiBearerAuth()
  @Post('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Administrative route to update a product',
  })
  @ApiBearerAuth()
  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return this.productService.update(id, UpdateProductDto);
  }

  @ApiOperation({
    summary: 'Administrative route to delete a product',
  })
  @ApiBearerAuth()
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
