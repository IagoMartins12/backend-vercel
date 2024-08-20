import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { create, Whatsapp } from 'venom-bot';

@Injectable()
export class VenomBotService implements OnModuleInit, OnModuleDestroy {
  // private client: Whatsapp;

  async onModuleInit() {
    // this.client = await create({
    //   session: 'whats-pizzaria', // Nome da sessão
    // });
  }

  onModuleDestroy() {
    // if (this.client) {
    //   this.client.close();
    // }
  }

  async sendMessage(to: string, message: string) {
    // try {
    //   // Adicionar o sufixo @c.us ao número de telefone
    //   if (!to.endsWith('@c.us')) {
    //     to = to.replace(/[^0-9]/g, '') + '@c.us';
    //   }
    //   const response = await this.client.sendText(to, message);
    //   console.log('response send message', response);
    //   return response;
    // } catch (error) {
    //   console.error('Error sending message:', error);
    //   // Customize the error message
    //   if (error.erro && error.text === 'The number does not exist') {
    //     throw new HttpException(
    //       'O número de telefone cadastrado não existe.',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   } else {
    //     throw new HttpException(
    //       'Ocorreu erro ao realizar o pedido. Entre em contato com nosso telefone.',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    // }
  }
}
