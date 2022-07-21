import { Module } from '@nestjs/common';
import { BetsService } from './bets.service';
import { BetsResolver } from './bets.resolver';
import { UsersService } from '../users/users.service';
import { GameService } from '../game/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { User } from '../users/entities/user.entity';
import { Game } from '../game/entities/game.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, User, Game])],
  providers: [
    BetsResolver,
    BetsService,
    UsersService,
    GameService,
    MailService,
  ],
})
export class BetsModule {}
