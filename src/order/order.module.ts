import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartModule } from 'src/cart/cart.module';
import { OrderGateway } from './order.gateway';
import { CouponsModule } from 'src/coupons/coupons.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [PrismaModule, CartModule, CouponsModule, MessagesModule],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway],
})
export class OrderModule {}
