import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Favorite } from '../entities/favorite.entity';

export class RemoveFavoriteDto extends Favorite {
  @ApiProperty({
    description: 'Id do favorite',
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
