import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameService } from '../game/game.service';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';
import { ChosenGame } from './interfaces/chosenGame';

@Injectable()
export class BetsService {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,

    private userService: UsersService,
    private gameService: GameService,
    private mailService: MailService,
  ) {}

  async create(userId: string, data: CreateBetInput[]): Promise<Bet[]> {
    const bets: ChosenGame[] = [];
    const user = await this.userService.findOne(userId);

    for (const chosenGame of data) {
      const game = await this.gameService.findOneById(
        chosenGame.game_id.toString(),
      );

      const hasTotalNumbers = chosenGame.numbers.length === game.maxNumber;

      if (!hasTotalNumbers) {
        throw new BadRequestException(
          `O jogo ${game.type} permite apenas ${game.maxNumber} números escolhidos`,
        );
      }

      if (chosenGame.price !== Number(game.price)) {
        throw new BadRequestException(
          `O valor do jogo apostado está incorreto.`,
        );
      }
      bets.push(
        this.betRepository.create({
          choosenNumbers: chosenGame.numbers.join(','),
          user,
          gameId: game.id,
          price: chosenGame.price,
        }),
      );
    }

    const totalPrice = bets.reduce((acc, currentValue) => {
      return acc + currentValue.price;
    }, 0);

    if (totalPrice < 30) {
      throw new BadRequestException(`O valor mínimo da aposta é de R$ 30,00`);
    }

    const betsSaved = await this.betRepository.save(bets);

    await this.mailService.senMailNewBet(user);

    return betsSaved;
  }

  async findAll(userId: string): Promise<Bet[]> {
    const bets = await this.betRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return bets;
  }

  async findOne(id: string, userId: string): Promise<Bet> {
    await this.userService.findOne(userId);

    const bet = await this.betRepository.findOneBy({ secureId: id });

    if (!bet) {
      throw new NotFoundException('Aposta não encontrada');
    }

    return bet;
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const bet = await this.findOne(id, userId);

    const betDeleted = await this.betRepository.remove(bet);

    if (betDeleted) {
      return true;
    }

    return false;
  }
}
