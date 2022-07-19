import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.usersService.create(data);

    return user;
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAllUsers();

    return users;
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);

    return user;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async userByEmail(@Args('email') email: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    return user;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = await this.usersService.update(id, data);

    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    return await this.usersService.remove(id);
  }
}
