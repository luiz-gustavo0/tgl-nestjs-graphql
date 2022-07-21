import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async create(data: CreateGameInput): Promise<Game> {
    const game = this.gameRepository.create(data);
    const gameSaved = await this.gameRepository.save(game);

    if (!gameSaved) {
      throw new InternalServerErrorException('Ocorreu um erro ao criar o jogo');
    }

    return gameSaved;
  }

  async findAll(): Promise<Game[]> {
    const games = await this.gameRepository.find();

    return games;
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ secureId: id });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return game;
  }

  async findOneById(id: string): Promise<Game> {
    const game = await this.gameRepository.findOneBy({ id });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return game;
  }

  async update(id: string, data: UpdateGameInput): Promise<Game> {
    const game = await this.findOne(id);

    await this.gameRepository.update({ secureId: id }, { ...data });

    const gameUpdated = this.gameRepository.create({ ...game, ...data });

    return gameUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const game = await this.findOne(id);

    const gameDeleted = await this.gameRepository.remove(game);

    if (gameDeleted) {
      return true;
    }

    return false;
  }
}
