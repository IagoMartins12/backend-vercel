import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { GetCategoryDto } from './dto/get-category-dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Get all categories',
  })
  @ApiOkResponse({
    type: GetCategoryDto,
    isArray: true,
  })
  @IsPublic()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Get unique category',
  })
  @ApiOkResponse({
    type: GetCategoryDto,
  })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Administrative route to create category',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Json structure for user object',
  })
  @Post('admin/')
  create(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.create(createCategory);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Administrative route to update category',
  })
  @Patch('admin/:id')
  update(@Body() createCategory: UpdateCategoryDto, @Param('id') id: string) {
    return this.categoryService.update(id, createCategory);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Administrative route to delete category',
  })
  @Delete('admin/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
