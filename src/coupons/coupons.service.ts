import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUser(user: User) {
    // Check avaliables coupons
    const availableCoupons = await this.prisma.discount_cupom.findMany({
      where: {
        active: 1,
      },
    });

    // Avaliables coupons ids
    const availableCouponIds = availableCoupons.map((coupon) => coupon.id);

    // Check already used coupons
    const couponsAlreadyUsed = await this.prisma.discount_cupom_orders.findMany(
      {
        where: {
          user_id: user.id,
          discount_cupom_id: {
            in: availableCouponIds,
          },
        },
      },
    );

    //Already used coupons ids
    const usedCouponIds = couponsAlreadyUsed.map(
      (order) => order.discount_cupom_id,
    );

    // Remove alreaded used coupons from avaliable coupons
    const availableCouponsFiltered = availableCoupons.filter(
      (coupon) => !usedCouponIds.includes(coupon.id),
    );

    return availableCouponsFiltered;
  }

  async findOne(id: string) {
    const coupom = await this.prisma.discount_cupom.findFirst({
      where: {
        id,
      },
    });

    return coupom;
  }

  async checkOne(cupom_name: string, user: User) {
    // check if coupon exists
    const coupon = await this.prisma.discount_cupom.findFirst({
      where: {
        cupom_name,
      },
    });

    if (!coupon) {
      throw new Error('Cupom não encontrado');
    }

    // Check already used coupons
    const couponsAlreadyUsed =
      await this.prisma.discount_cupom_orders.findFirst({
        where: {
          user_id: user.id,
          discount_cupom_id: coupon.id,
        },
      });

    if (couponsAlreadyUsed) {
      return false;
    }
    return coupon;
  }

  create(createCouponDto: CreateCouponDto) {
    return this.prisma.discount_cupom.create({
      data: {
        active: 1,
        cupom_name: createCouponDto.cupom_name,
        discount: createCouponDto.discount,
        expiration_date: createCouponDto.expiration_date,
        type_coupon: createCouponDto.type_coupon,
      },
    });
  }

  findAll() {
    return this.prisma.discount_cupom.findMany();
  }

  findOneAdmin(id: string) {
    return this.prisma.discount_cupom.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateCouponDto: any) {
    return this.prisma.discount_cupom.update({
      where: {
        id,
      },
      data: updateCouponDto,
    });
  }

  remove(id: string) {
    return this.prisma.discount_cupom.delete({
      where: {
        id,
      },
    });
  }
}
