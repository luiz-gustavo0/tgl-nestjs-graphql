import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.usersService.create(data);

    return user;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAllUsers();

    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async findOne(@CurrentUser() user: User): Promise<User> {
    const response = await this.usersService.findOne(user.secureId);

    return response;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async userByEmail(@CurrentUser() user: User): Promise<User> {
    const response = await this.usersService.getUserByEmail(user.email);

    return response;
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const response = await this.usersService.update(user.secureId, data);

    return response;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeUser(@CurrentUser() user: User): Promise<boolean> {
    return await this.usersService.remove(user.secureId);
  }
}
