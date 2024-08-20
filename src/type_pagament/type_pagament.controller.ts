import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { TypePagamentService } from './type_pagament.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTypePagamentDto } from './dto/create-type-pagament.dto';
import { GetTypePagamentDto } from './dto/get-type-pagament.dto';

@ApiTags('typePagament')
@Controller('typePagament')
export class TypePagamentController {
  constructor(private readonly typePagamentService: TypePagamentService) {}

  @ApiOperation({
    summary: 'Get all type pagament',
  })
  @ApiOkResponse({
    type: GetTypePagamentDto,
    isArray: true,
  })
  @IsPublic()
  @Get()
  findAll() {
    return this.typePagamentService.findAll();
  }

  @ApiOperation({
    summary: 'Get unique type pagament',
  })
  @ApiOkResponse({
    type: GetTypePagamentDto,
  })
  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typePagamentService.findById(id);
  }

  @ApiOperation({
    summary: 'Administrative route to update type pagament',
  })
  @Patch('admin/:id')
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() createTypePagamentDto: CreateTypePagamentDto,
  ) {
    return this.typePagamentService.update(id, createTypePagamentDto);
  }
  @ApiOperation({
    summary: 'Administrative route to delete type pagament',
  })
  @ApiBearerAuth()
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.typePagamentService.remove(id);
  }
}
