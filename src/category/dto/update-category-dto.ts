import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

export class UpdateCategoryDto extends Category {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category_name: string;
}
