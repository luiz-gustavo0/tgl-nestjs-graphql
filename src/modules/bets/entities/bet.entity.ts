import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from 'src/modules/game/entities/game.entity';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ name: 'secury_id' })
  @Generated('uuid')
  secureId: string;

  @Column({ name: 'game_id' })
  gameId: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ name: 'choosen_numbers' })
  choosenNumbers: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.bets)
  user: User;
}
