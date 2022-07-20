import { CreateGameInput } from './create-game.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  type?: string;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  range?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  maxNumber?: number;

  @IsString()
  @IsNotEmpty({ message: 'Este campo não pode estar vazio' })
  @IsOptional()
  color?: string;
}
