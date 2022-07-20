import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ name: 'secury_id' })
  @Generated('uuid')
  secureId: string;

  @Column({ unique: true })
  type: string;

  @Column()
  description: string;

  @Column()
  range: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ name: 'max_number' })
  maxNumber: number;

  @Column()
  color: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
