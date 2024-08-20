import { Injectable } from '@nestjs/common';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarouselService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarouselDto: CreateCarouselDto) {
    const carousel = await this.prisma.carouselImages.create({
      data: {
        image: createCarouselDto.image,
      },
    });
    return carousel;
  }

  async findAll() {
    const carousel = await this.prisma.carouselImages.findMany();
    return carousel;
  }

  async update(id: string, updateCarouselDto: CreateCarouselDto) {
    const carousel = await this.prisma.carouselImages.update({
      data: {
        image: updateCarouselDto.image,
      },
      where: {
        id: id,
      },
    });
    return carousel;
  }

  async remove(id: string) {
    const carousel = await this.prisma.carouselImages.delete({
      where: {
        id: id,
      },
    });
    return carousel;
  }
}
