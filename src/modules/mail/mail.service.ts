import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async senMailResetPassword(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Solicitação para recuperação de senha',
        template: './reset-password',
        context: {
          name: user.name,
          token,
        },
      });
    } catch (error) {
      console.log('Send mail', error);
    }
  }
}
