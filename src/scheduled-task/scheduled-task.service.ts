import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScheduledTaskService {
  constructor(private readonly prisma: PrismaService) {
    this.scheduleDailyTask();
  }

  private scheduleDailyTask() {
    // Agende a tarefa para rodar diariamente às 00:00 (meia-noite)
    cron.schedule('0 0 * * *', async () => {
      try {
        // Obtenha todos os cupons ativos
        const activeCoupons = await this.prisma.discount_cupom.findMany({
          where: {
            active: 1, // Use true em vez de 1 para ativos
          },
        });

        // Obtenha a data atual
        const currentDate = new Date();

        // Itere pelos cupons ativos e verifique a data de expiração
        for (const coupon of activeCoupons) {
          if (coupon.expiration_date < currentDate) {
            // Se a data de expiração for menor que a data atual, defina o cupom como inativo
            await this.prisma.discount_cupom.update({
              where: { id: coupon.id },
              data: { active: 0 },
            });
          }
        }

        console.log('Tarefa agendada executada às 00:00.');
      } catch (error) {
        console.error('Ocorreu um erro ao processar a tarefa agendada:', error);
      }
    });
  }
}
