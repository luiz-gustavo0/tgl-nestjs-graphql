import { User } from 'src/modules/users/entities/user.entity';

export interface ChosenGame {
  choosenNumbers: string;
  user: User;
  gameId: string;
  price: number;
}
