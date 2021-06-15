import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  async fildAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User do not fount');
    }
    return user;
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.findUserById(id);
    await this.userRepository.update(user, {...data});
    const userUpdated = this.userRepository.create({...user, ...data});
    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);
    const userDeleted = await this.userRepository.delete(user);
    if (userDeleted) {
      return true;
    }
    return false;
  }
}
