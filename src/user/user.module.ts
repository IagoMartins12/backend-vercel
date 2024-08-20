import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RewardModule } from 'src/reward/reward.module';
import { OrderModule } from 'src/order/order.module';
import { CartModule } from 'src/cart/cart.module';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  imports: [PrismaModule, RewardModule, CouponsModule, OrderModule, CartModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
