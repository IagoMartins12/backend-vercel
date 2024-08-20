import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGeneralData } from './dto/general_data.dto';

@Injectable()
export class GeneralDataService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.general_data.findFirst();
  }

  async update(generalDataDto: CreateGeneralData) {
    const generalData = await this.prisma.general_data.findFirstOrThrow();
    console.log('generalData', generalData);
    return this.prisma.general_data.update({
      where: {
        id: generalData.id,
      },
      data: generalDataDto,
    });
  }
}
