import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { GqlAuthGuard } from '../auth/auth.guard';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const game = await this.gameService.create(data);

    return game;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Game], { name: 'games' })
  async findAll(): Promise<Game[]> {
    const games = await this.gameService.findAll();

    return games;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Game, { name: 'game' })
  async findOne(@Args('id') id: string): Promise<Game> {
    const game = await this.gameService.findOne(id);

    return game;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Game)
  async updateGame(
    @Args('id') id: string,
    @Args('data') data: UpdateGameInput,
  ): Promise<Game> {
    const game = await this.gameService.update(id, data);

    return game;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Boolean)
  async removeGame(@Args('id') id: string): Promise<boolean> {
    return await this.gameService.remove(id);
  }
}
