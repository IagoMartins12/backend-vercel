import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category-dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  create(createCategory: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategory,
    });
  }

  delete(id: string) {
    return this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateCategory: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: updateCategory,
    });
  }
}
