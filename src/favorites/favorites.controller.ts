import { Controller, Get, Post, Body, Delete, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveFavoriteDto } from './dto/update-favorite.dto';
import { GetFavoriteDto } from './dto/get-favorite.dto';
@ApiBearerAuth()
@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all user favorites',
  })
  @ApiOkResponse({
    type: GetFavoriteDto,
    isArray: true,
  })
  @Get('')
  findAll(@Req() req: AuthRequest) {
    return this.favoritesService.findAll(req.user);
  }
  @ApiOperation({
    summary: 'Add item to favorites',
  })
  @Post('add')
  create(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Req() req: AuthRequest,
  ) {
    return this.favoritesService.create(createFavoriteDto, req.user);
  }

  @ApiOperation({
    summary: 'Delete item from favorites',
  })
  @Delete('delete')
  remove(
    @Body() removeFavoriteDto: RemoveFavoriteDto,
    @Req() req: AuthRequest,
  ) {
    return this.favoritesService.remove(removeFavoriteDto, req.user);
  }
}
