import { VenomBotModule } from './venom-bot/venom_bot.module';
import { VenomBotController } from './venom-bot/venom_bot.controller';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypePagamentModule } from './type_pagament/type_pagament.module';
import { TypePagamentController } from './type_pagament/type_pagament.controller';
import { ProductController } from './product/product.controller';
import { CartModule } from './cart/cart.module';
import { UserAddressModule } from './user_address/user_address.module';
import { OrderModule } from './order/order.module';
import { ScheduledTaskService } from './scheduled-task/scheduled-task.service';
import { ScheduledTaskModule } from './scheduled-task/scheduled-task.module';
import { EmailsService } from './emails/emails.service';
import { EmailsModule } from './emails/emails.module';
import { StateModule } from './state/state.module';
import { RewardModule } from './reward/reward.module';
import { GeneralDataModule } from './general_data/general_data.module';
import { CouponsModule } from './coupons/coupons.module';
import { DeliveryManModule } from './delivery_man/delivery_man.module';
import { OrderGateway } from './order/order.gateway';
import { MessagesModule } from './messages/messages.module';
import { CarouselModule } from './carousel/carousel.module';
import { SwaggerAuthInterceptor } from './auth/interceptor/auth.interceptor';

@Module({
  imports: [
    VenomBotModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    FavoritesModule,
    TypePagamentModule,
    CartModule,
    UserAddressModule,
    OrderModule,
    CouponsModule,
    ScheduledTaskModule,
    EmailsModule,
    StateModule,
    RewardModule,
    GeneralDataModule,
    CouponsModule,
    DeliveryManModule,
    MessagesModule,
    CarouselModule,
  ],
  controllers: [
    VenomBotController,
    AppController,
    CategoryController,
    TypePagamentController,
    ProductController,
  ],
  //Definindo que todas as rotas após essa, sejam protegidas por esse guardiao
  providers: [
    AppService,
    CategoryService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SwaggerAuthInterceptor,
    },
    ScheduledTaskService,
    EmailsService,
    OrderGateway,
  ],
})
export class AppModule {}
