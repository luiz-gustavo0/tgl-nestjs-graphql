import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Bet])
  async createBet(
    @CurrentUser() user: User,
    @Args('data', { type: () => [CreateBetInput] }) data: CreateBetInput[],
  ): Promise<Bet[]> {
    const bets = await this.betsService.create(user.secureId, data);
    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet], { name: 'bets' })
  async findAll(@CurrentUser() user: User): Promise<Bet[]> {
    const bets = await this.betsService.findAll(user.id);

    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet, { name: 'bet' })
  async findOne(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Bet> {
    const bet = await this.betsService.findOne(id, user.secureId);
    return bet;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async removeBet(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.betsService.remove(id, user.secureId);
  }
}
