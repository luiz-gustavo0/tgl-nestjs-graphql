import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
}
