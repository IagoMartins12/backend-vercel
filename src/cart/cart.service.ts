import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RemoveCartDto } from './dto/remove-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrder(id: string) {
    const myProducts = await this.prisma.cart_product.findMany({
      where: {
        cart_id: id,
      },
    });
    return myProducts;
  }
  async getCart(user: User) {
    const myCart = await this.prisma.cart.findFirst({
      where: {
        user_id: user.id,
        is_active: 1,
      },
    });

    return myCart;
  }
  async findProduct(user: User) {
    const myCart = await this.prisma.cart.findFirst({
      where: {
        user_id: user.id,
        is_active: 1,
      },
    });

    if (!myCart) {
      return [];
    }

    const myProducts = await this.prisma.cart_product.findMany({
      where: {
        cart_id: myCart.id,
      },
    });

    return myProducts;
  }

  async addProduct(user: User, createCartDto: CreateCartDto) {
    const myCart = await this.prisma.cart.findFirst({
      where: {
        is_active: 1,
        user_id: user.id,
      },
    });

    const myProducts = await this.prisma.cart_product.create({
      data: {
        cart_id: myCart.id,
        quantity: createCartDto.quantity,
        product_id: createCartDto.product_id,
        product_id_2: createCartDto?.product_id_2,
        product_id_3: createCartDto?.product_id_3,
        size: createCartDto.size,
        observation: createCartDto.observation,
        value: createCartDto.value,
      },
    });

    return myProducts;
  }

  async attProduct(updateCartDto: UpdateCartDto) {
    const myAttProduct = await this.prisma.cart_product.update({
      where: {
        id: updateCartDto.id,
      },
      data: {
        quantity: updateCartDto.quantity,
        value: updateCartDto.value,
      },
    });

    return myAttProduct;
  }

  async removeProduct(removeCartDto: RemoveCartDto) {
    const myProductCart = await this.prisma.cart_product.delete({
      where: {
        id: removeCartDto.cart_product_id,
      },
    });

    return myProductCart;
  }
}
