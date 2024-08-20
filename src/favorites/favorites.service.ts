import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { RemoveFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto, user: User) {
    if (!user) {
      return new Error('Usuário inválido!');
    }

    const favorite = await this.prisma.favorite.create({
      data: {
        product_id: createFavoriteDto.product_id,
        user_id: user.id,
      },
    });

    return favorite;
  }

  async findAll(user: User) {
    const allFavorites = await this.prisma.favorite.findMany({
      where: {
        user_id: user.id,
      },
    });
    return allFavorites;
  }

  async remove(removeFavoriteDto: RemoveFavoriteDto, user: User) {
    if (!user) {
      return new Error('Usuário inválido!');
    }

    const favorite = await this.prisma.favorite.delete({
      where: {
        id: removeFavoriteDto.id,
        AND: {
          user_id: user.id,
        },
      },
    });

    return favorite;
  }
}
