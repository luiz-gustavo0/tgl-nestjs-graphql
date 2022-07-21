import {
  ObjectType,
  Field,
  ID,
  HideField,
  registerEnumType,
} from '@nestjs/graphql';
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashPasswordTransform } from 'src/helpers/crypto';
import { Bet } from 'src/modules/bets/entities/bet.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

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
    enum: UserRole,
    array: true,
    default: ['user'],
  })
  roles: UserRole[];

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true, name: 'token_expiration_time' })
  tokenExpirationTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];

  @BeforeUpdate()
  public updateDate() {
    this.updatedAt = new Date();
  }
}
