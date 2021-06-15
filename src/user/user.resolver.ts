import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ){}

  @Query(() => User)
  async findUserById(
    @Args('id') id: string
  ): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    return await this.userService.fildAllUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserDTO
  ): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserDTO
  ): Promise<User> {
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id') id: string
  ): Promise<boolean> {
    const userDeleted = await this.userService.deleteUser(id);
    return userDeleted;
  }
}
