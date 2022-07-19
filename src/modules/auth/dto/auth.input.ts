import { InputType } from '@nestjs/graphql';

@InputType()
export class Authinput {
  email: string;
  password: string;
}
