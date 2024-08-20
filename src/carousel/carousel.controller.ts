import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarouselService } from './carousel.service';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetCarouselDto } from './dto/get-carousel.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('carousel')
@Controller('carousel')
export class CarouselController {
  constructor(private readonly carouselService: CarouselService) {}

  @ApiOkResponse({
    type: GetCarouselDto,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Get the images from carousel',
  })
  @IsPublic()
  @Get('')
  findAll() {
    return this.carouselService.findAll();
  }

  @ApiBearerAuth()
  @Post('admin')
  @ApiOperation({
    summary: 'Administrative route to create a new image on carousel',
  })
  @ApiOkResponse({
    type: CreateCarouselDto,
    description: 'Json structure for user object',
  })
  create(@Body() createCarouselDto: CreateCarouselDto) {
    return this.carouselService.create(createCarouselDto);
  }

  @ApiOkResponse({
    type: CreateCarouselDto,
  })
  @ApiOperation({
    summary: 'Administrative route to update the images from carousel',
  })
  @ApiBearerAuth()
  @Patch('admin/:id')
  update(
    @Param('id') id: string,
    @Body() updateCarouselDto: CreateCarouselDto,
  ) {
    return this.carouselService.update(id, updateCarouselDto);
  }

  @ApiOperation({
    summary: 'Administrative route to delete the images from carousel',
  })
  @ApiBearerAuth()
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.carouselService.remove(id);
  }
}
