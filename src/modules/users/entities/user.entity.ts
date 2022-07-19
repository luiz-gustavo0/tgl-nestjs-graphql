import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashPasswordTransform } from 'src/helpers/crypto';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ name: 'secury_id' })
  @Generated('uuid')
  secureId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ transformer: hashPasswordTransform })
  @HideField()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  tokenExpirationTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
