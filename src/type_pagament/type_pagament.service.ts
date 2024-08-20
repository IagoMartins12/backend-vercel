import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypePagamentDto } from './dto/create-type-pagament.dto';

@Injectable()
export class TypePagamentService {
  constructor(private readonly prisma: PrismaService) {}

  remove(id: string) {
    return this.prisma.type_Pagament.delete({
      where: {
        id,
      },
    });
  }

  create(createTypePagament: CreateTypePagamentDto) {
    return this.prisma.type_Pagament.create({ data: createTypePagament });
  }

  update(id: string, createTypePagament: CreateTypePagamentDto) {
    return this.prisma.type_Pagament.update({
      data: createTypePagament.type_pagament_name,
      where: {
        id: id,
      },
    });
  }

  findById(id: string) {
    return this.prisma.type_Pagament.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.type_Pagament.findMany();
  }
}
