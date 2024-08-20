import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from '../entities/favorite.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto extends Favorite {
  @ApiProperty({
    description: 'Id do produto',
  })
  @IsNotEmpty()
  @IsString()
  product_id: string;
}
