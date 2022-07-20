import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  @IsOptional()
  token?: string;

  @IsDate()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  @IsOptional()
  tokenExpirationTime?: Date;
}
