import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './models/ForgetPassword';
import { v4 as uuidv4 } from 'uuid';
import { RewardService } from 'src/reward/reward.service';
import { CartService } from 'src/cart/cart.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { ChangePasswordDto } from './models/ChangePassword';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rewardService: RewardService,
    private readonly couponService: CouponsService,
    private readonly cartService: CartService,
  ) {}

  async getAll() {
    return this.prisma.user.findMany();
  }

  async create(createUserDto: CreateUserDto, res: Response) {
    const checkIfExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkIfExists) {
      throw new HttpException('E-mail já existe!', HttpStatus.BAD_REQUEST);
    }
    const token = uuidv4(); // Gere um token único

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      token: token, // Salve o token na tabela user
    };

    const createdUser = await this.prisma.user.create({ data });
    const userCart = await this.prisma.cart.create({
      data: {
        user_id: createdUser.id,
      },
    });

    const newUser = {
      ...createdUser,
      password: undefined,
    };
    throw new HttpException(newUser, HttpStatus.CREATED);
  }

  findByEmail(email: string) {
    const user = this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
    });
    return user;
  }

  async findMe(user: User) {
    const me = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    return me;
  }

  async changePassword(user: User, ForgetPassword: ResetPasswordDto) {
    const updatedPassword = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(ForgetPassword.newPassword, 10),
      },
    });

    return 'Senha atualizada!';
  }

  async resetPassword(changePassword: ChangePasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: changePassword.email,
      },
    });

    if (!user) {
      throw new HttpException('Email inválido!', HttpStatus.BAD_REQUEST);
    }

    if (user.token !== changePassword.token)
      throw new HttpException('Token inválido!', HttpStatus.BAD_REQUEST);

    const token = uuidv4(); // Gere um token único

    const updatedPassword = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await bcrypt.hash(changePassword.newPassword, 10),
        token: token,
      },
    });

    return 'Senha atualizada!';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return deletedUser;
  }

  async getData(user: User) {
    const myUser = await this.findMe(user);

    try {
      const [userAddress, rewards, favorites, coupons, orders, cartProducts] =
        await Promise.all([
          this.prisma.user_Adress.findMany({ where: { user_id: user.id } }),
          this.rewardService.getUserRewards(myUser),
          this.prisma.favorite.findMany({ where: { user_id: user.id } }),
          this.couponService.findAllByUser(myUser),
          this.findAllOrderByUser(myUser),
          this.cartService.findProduct(myUser),
        ]);

      return {
        user: myUser,
        userAddress,
        rewards,
        favorites,
        coupons,
        orders,
        cartProducts,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao obter dados do usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllOrderByUser(user: User) {
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
}
