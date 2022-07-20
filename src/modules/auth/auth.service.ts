import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Authinput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(data: Authinput): Promise<AuthType> {
    const user = await this.userService.getUserByEmail(data.email);

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      name: user.name,
      roles: user.roles,
      sub: user.secureId,
    };

    return this.jwtService.signAsync(payload);
  }

  async resetPassword(email: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    const token = uuidv4();
    const tokenExpirationTime = new Date();

    const userUpdated = await this.userService.update(user.secureId, {
      token,
      tokenExpirationTime,
    });

    await this.mailService.senMailResetPassword(userUpdated, token);

    return userUpdated;
  }

  async changePassword(token: string, password: string): Promise<User> {
    const user = await this.userService.getUserByToken(token);

    const newDateMoreThan2Days = dayjs(user.tokenExpirationTime)
      .add(2, 'd')
      .format();
    const currentDate = dayjs().format();

    if (newDateMoreThan2Days < currentDate) {
      throw new UnauthorizedException('Token expirado, gere um novo token.');
    }

    const userUpdated = await this.userService.update(user.secureId, {
      password,
    });

    return userUpdated;
  }
}
