import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  confirmEmailTemplate,
  recoverPasswordTemplate,
} from './templates/templates';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailsService {
  constructor(private readonly prisma: PrismaService) {}
  async confirmEmail(sendEmailDto: SendEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: sendEmailDto.to,
      },
    });
    const subject = 'Confirme o seu email';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL as string,
        pass: 'dmmprajscyftpiar',
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL as string,
      to: sendEmailDto.to,
      subject: subject,
      html: confirmEmailTemplate(user),
    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  }

  async recoverPassword(sendEmailDto: SendEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: sendEmailDto.to,
      },
    });

    if (!user) {
      throw new HttpException('E-mail não cadastrado!', HttpStatus.BAD_REQUEST);
    }
    const subject = 'Recuperação de senha';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL as string,
        pass: 'dmmprajscyftpiar',
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL as string,
      to: sendEmailDto.to,
      subject: subject,
      html: recoverPasswordTemplate(user),
    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  }
}
