import { Injectable } from '@nestjs/common';
import { CreateDeliveryManDto } from './dto/create-delivery_man.dto';
import { UpdateDeliveryManDto } from './dto/update-delivery_man.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveryManService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDeliveryManDto: CreateDeliveryManDto) {
    return this.prisma.delivery_Man.create({ data: createDeliveryManDto });
  }

  findAll() {
    return this.prisma.delivery_Man.findMany();
  }

  findOne(id: string) {
    return this.prisma.delivery_Man.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, updateDeliveryManDto: UpdateDeliveryManDto) {
    return this.prisma.delivery_Man.update({
      data: {
        delivery_man_name: updateDeliveryManDto.delivery_man_name,
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.delivery_Man.delete({
      where: {
        id,
      },
    });
  }
}
