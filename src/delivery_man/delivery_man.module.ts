import { Module } from '@nestjs/common';
import { DeliveryManService } from './delivery_man.service';
import { DeliveryManController } from './delivery_man.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeliveryManController],
  providers: [DeliveryManService],
  exports: [DeliveryManService],
})
export class DeliveryManModule {}
