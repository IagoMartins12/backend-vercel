import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart, User } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
// import { OrderGateway } from './order.gateway';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
    private readonly messagesService: MessagesService,
    // private readonly orderGateway: OrderGateway,
  ) {}

  //Routes functions
  async findAll() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }

  async checkEstimateDate() {
    const today = new Date();
    const date = today.toISOString().split('T')[0]; // Obtém a data no formato 'YYYY-MM-DD'

    const orders = await this.findAllByDate(date);

    // Buscar estados ativos (diferentes de 'Concluído' e 'Cancelado')
    const activeStates = await this.prisma.state
      .findMany({
        where: {
          NOT: [{ state_name: 'Entregue' }, { state_name: 'Cancelado' }],
        },
      })
      .then((states) => states.map((state) => state.id));

    // Filtrar os pedidos ativos
    const activeOrders = orders.filter((order) =>
      activeStates.includes(order.state_id),
    );

    // Determinar o número de pedidos ativos
    const activeOrderCount = activeOrders.length;

    // Calcular a estimativa com base no número de pedidos ativos
    let estimate = 0;
    if (activeOrderCount >= 0 && activeOrderCount <= 8) {
      estimate = 20;
    } else if (activeOrderCount >= 9 && activeOrderCount <= 15) {
      estimate = 30;
    } else if (activeOrderCount >= 16 && activeOrderCount <= 22) {
      estimate = 40;
    } else {
      estimate = 50;
    }

    return estimate;
  }

  async findAllByDate(date: string) {
    let whereCondition = {};
    if (date) {
      whereCondition = {
        AND: {
          order_date: {
            gte: new Date(date + 'T00:00:00Z'),
            lt: new Date(date + 'T23:59:59Z'),
          },
        },
      };
    }
    const orders = await this.prisma.order.findMany({
      where: whereCondition,
    });

    const ordersWithUser = await Promise.all(
      orders.map(async (order) => {
        const user = await this.prisma.user.findFirst({
          where: {
            id: order.user_id,
          },
          select: {
            name: true,
          },
        });
        return {
          ...order,
          user,
        };
      }),
    );

    return ordersWithUser;
  }

  async findAllByUser(user: User) {
    const orders = await this.prisma.order.findMany({
      where: {
        user_id: user.id,
      },
    });

    const orderItens = await this.prisma.cart_product.findMany({
      where: {
        cart_id: {
          in: orders.map((order) => order.cart_id),
        },
      },
    });

    const filteredOrders = orders.map((order) => {
      const items = orderItens.filter((item) => item.cart_id === order.cart_id);
      return {
        ...order,
        orderItems: items,
      };
    });

    return filteredOrders;
  }

  async create(createOrderDto: CreateOrderDto, user: User) {
    const cart = await this.cartService.getCart(user);

    const orderData: any = {
      user_id: user.id,
      cart_id: cart.id,
      total_amount: createOrderDto.total_amount,
      type_pagament_id: createOrderDto.type_pagament_id,
      user_adress_id: createOrderDto.user_adress_id,
      state_id: createOrderDto.state_id,
      discount_value: createOrderDto.discount_value,
      contact_phone: createOrderDto.contact_phone,
    };

    // try {
    //   await this.messagesService.sendMessage(
    //     createOrderDto.contact_phone,
    //     createOrderDto.template,
    //   );
    // } catch (error) {
    //   console.error('Failed to send message:', error);
    //   throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    // }

    let order;
    if (createOrderDto.discount_coupon_id) {
      order = await this.createOrderWithCoupon(createOrderDto, user, orderData);
    } else if (createOrderDto.reward_id) {
      order = await this.createOrderWithReward(createOrderDto, orderData);
    } else {
      order = await this.prisma.order.create({ data: orderData });
    }

    try {
      await this.handlePostOrderCreation(order, cart, user);
    } catch (error) {
      console.error('Failed to handle post order creation:', error);
      throw new HttpException(
        'Failed to handle post order creation',
        HttpStatus.BAD_REQUEST,
      );
    }

    return order;
  }

  private async handlePostOrderCreation(order: any, cart: any, user: User) {
    await this.desativeUserCart(cart);
    await this.createNewCart(user);
    // this.orderGateway.handleNewOrder(order);
  }

  private async createOrderWithCoupon(
    createOrderDto: CreateOrderDto,
    user: User,
    orderData: any,
  ) {
    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        discount_coupon_id: createOrderDto.discount_coupon_id,
      },
    });

    await this.prisma.discount_cupom_orders.create({
      data: {
        user_id: user.id,
        discount_cupom_id: createOrderDto.discount_coupon_id,
        order_id: order.id,
      },
    });

    return order;
  }

  private async createOrderWithReward(
    createOrderDto: CreateOrderDto,
    orderData: any,
  ) {
    const order = await this.prisma.order.create({
      data: {
        ...orderData,
        reward_id: createOrderDto.reward_id,
      },
    });

    await this.prisma.reward_orders.update({
      where: { id: createOrderDto.reward_id },
      data: { isUsed: 1 },
    });

    return order;
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
      },
    });

    const orderItens = await this.prisma.cart_product.findMany({
      where: {
        cart_id: order.cart_id,
      },
    });

    const filteredOrders = {
      ...order,
      orderItens,
    };

    return filteredOrders;
  }

  //Helpers functions
  async createNewCart(user: User) {
    await this.prisma.cart.create({
      data: {
        user_id: user.id,
      },
    });
  }

  async desativeUserCart(myCart: Cart) {
    await this.prisma.cart.updateMany({
      where: {
        id: myCart.id,
      },
      data: {
        is_active: 0,
      },
    });
  }
}
