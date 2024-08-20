import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStateDto } from './dto/update-state-dtop';
import { MessagesService } from 'src/messages/messages.service';
import { RewardService } from 'src/reward/reward.service';
import { CreateStateDto } from './dto/create-state-dto';

@Injectable()
export class StateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messagesService: MessagesService,
    private readonly rewardService: RewardService,
  ) {}

  remove(id: string) {
    return this.prisma.state.delete({
      where: {
        id,
      },
    });
  }

  create(stateDto: CreateStateDto) {
    return this.prisma.state.create({ data: stateDto });
  }

  update(id: string, createStateDto: CreateStateDto) {
    return this.prisma.state.update({
      data: createStateDto.state_name,
      where: {
        id: id,
      },
    });
  }

  findById(id: string) {
    return this.prisma.state.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.state.findMany();
  }

  getTemplate(state: string) {
    return `Atualização do status do seu pedido. Pedido ${state}`;
  }

  async updateOrder(stateDto: UpdateStateDto) {
    const state = await this.prisma.state.findFirstOrThrow({
      where: {
        id: stateDto.orderStateId,
      },
    });

    const order = await this.prisma.order.findFirst({
      where: {
        id: stateDto.orderId,
      },
    });

    if (state.state_name.toUpperCase() === 'ENTREGUE') {
      await this.rewardService.updateUser(order.user_id, order.total_amount);
    }
    // if (stateDto.sendMessage) {
    //   const template = this.getTemplate(state.state_name);

    //   await this.messagesService.sendMessage(
    //     `55${order.contact_phone}`,
    //     template,
    //   );
    // }

    return this.prisma.order.update({
      where: {
        id: stateDto.orderId,
      },
      data: {
        state_id: stateDto.orderStateId,
        delivery_man_id: stateDto.deliveryManId,
      },
    });
  }
}
