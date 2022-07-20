import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  range: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  maxNumber: number;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  color: string;
}
