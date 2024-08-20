import { Module } from '@nestjs/common';
import { GeneralDataService } from './general_data.service';
import { GeneralDataController } from './general_data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GeneralDataService],
  controllers: [GeneralDataController],
  exports: [GeneralDataService],
})
export class GeneralDataModule {}
