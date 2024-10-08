import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarouselDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
}
