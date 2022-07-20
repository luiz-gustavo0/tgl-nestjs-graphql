import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Authinput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: Authinput): Promise<AuthType> {
    const { token, user } = await this.authService.validateUser(data);

    return {
      user,
      token,
    };
  }

  @Mutation(() => User)
  public async resetPassword(@Args('email') email: string): Promise<User> {
    const user = await this.authService.resetPassword(email);

    return user;
  }

  @Mutation(() => User)
  public async changePassword(
    @Args('token') token: string,
    @Args('password') password: string,
  ): Promise<User> {
    const user = await this.authService.changePassword(token, password);

    return user;
  }
}
