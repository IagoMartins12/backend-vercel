import { Module } from '@nestjs/common';
import { TypePagamentService } from './type_pagament.service';
import { TypePagamentController } from './type_pagament.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TypePagamentService],
  controllers: [TypePagamentController],
  exports: [TypePagamentService],
})
export class TypePagamentModule {}
