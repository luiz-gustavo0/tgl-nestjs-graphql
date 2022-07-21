import { InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateBetInput {
  @IsArray()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio ' })
  numbers: number[];

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  game_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  price: number;
}
