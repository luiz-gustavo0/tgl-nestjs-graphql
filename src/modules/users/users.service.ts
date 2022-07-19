import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o usuário',
      );
    }

    return userSaved;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ secureId: id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    await this.userRepository.update(id, { ...data });

    const userUpdated = this.userRepository.create({ ...user, ...data });

    const userSaved = await this.userRepository.save(userUpdated);

    return userSaved;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);

    const userDeleted = await this.userRepository.remove(user);

    if (userDeleted) {
      return true;
    }

    return false;
  }
}
