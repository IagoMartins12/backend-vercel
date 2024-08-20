import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRewardDto, CreateRewardUserDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(private readonly prisma: PrismaService) {}

  //routes
  async findAll() {
    const allRewards = await this.prisma.reward.findMany();
    return allRewards;
  }

  async findAllRewardUsers() {
    const allRewards = await this.prisma.reward_orders.findMany();
    return allRewards;
  }

  async catchReward(user: User, createRewardDto: CreateRewardUserDto) {
    const { id: userId, points: userPoints } = await this.prisma.user.findFirst(
      {
        where: { id: user.id },
      },
    );

    const reward = await this.prisma.reward.findFirst({
      where: { id: createRewardDto.rewardId },
    });

    if (reward.quantity_points > userPoints) {
      throw new HttpException('Pontos insuficientes', HttpStatus.BAD_REQUEST);
    }

    const reward_code = this.generateRandomCode();

    const userReward = await this.prisma.reward_orders.create({
      data: {
        user_id: userId,
        reward_id: reward.id,
        reward_code,
      },
    });

    await this.updateUserPoints(userId, userPoints, reward.quantity_points);
    const createReward = await this.prisma.reward_orders.findFirst({
      where: { id: userReward.id },
      include: {
        reward: {
          select: {
            id: true,
            image: true,
            name: true,
            quantity_points: true,
            type_reward: true,
            discount: true,
            product_id: true,
          },
        },
      },
    });

    const formattedReward = this.mapRewardResult(createReward);

    return formattedReward;
  }

  async getUserRewards(user: User) {
    const rewards = await this.prisma.reward_orders.findMany({
      where: { user_id: user.id, isUsed: 0 },
      include: {
        reward: {
          select: {
            id: true,
            image: true,
            name: true,
            quantity_points: true,
            type_reward: true,
            discount: true,
            product_id: true,
          },
        },
      },
    });

    const formattedRewards = rewards.map(this.mapRewardResult);

    return formattedRewards;
  }

  create(createRewardDto: CreateRewardDto) {
    return this.prisma.reward.create({
      data: createRewardDto,
    });
  }

  update(id: string, createRewardDto: CreateRewardDto) {
    return this.prisma.reward.update({
      where: {
        id,
      },
      data: createRewardDto,
    });
  }

  delete(id: string) {
    return this.prisma.reward.delete({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, points: number) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        points: points + user.points,
      },
    });

    return updatedUser;
  }

  //Helpers
  private generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  private async updateUserPoints(
    userId: string,
    currentPoints: number,
    deduction: number,
  ) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { points: currentPoints - deduction },
    });

    return updatedUser;
  }

  private mapRewardResult(rewardOrder) {
    return {
      id: rewardOrder.id,
      reward_code: rewardOrder.reward_code,
      rewardId: rewardOrder.reward.id,
      rewardImage: rewardOrder.reward.image,
      rewardName: rewardOrder.reward.name,
      rewardPoints: rewardOrder.reward.quantity_points,
      rewardType: rewardOrder.reward.type_reward,
      rewardDiscount: rewardOrder.reward.discount,
      rewardProductId: rewardOrder.reward.product_id,
    };
  }
}
