import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const newUser = this.usersRepository.create(createUserDto);
    const user = await this.usersRepository.save(newUser);
    return User.toResponse(user);
  }

  async findAll(): Promise<Partial<User>[]> {
    const usersList = await this.usersRepository.find();
    return usersList.map(User.toResponse);
  }

  async findOne(id: string): Promise<Partial<User> | undefined> {
    const user = await this.usersRepository.findOne(id);
    if (!user) return undefined;
    return User.toResponse(user);
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<Partial<User> | undefined> {
    const userForUpdate = await this.usersRepository.findOne(id);
    if (!userForUpdate) return undefined;
    const updateResult = await this.usersRepository.save({
      ...userForUpdate,
      ...updateUserDto,
    });
    return User.toResponse(updateResult);
  }

  async remove(id: string): Promise<boolean | undefined> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) return undefined;
    return true;
  }
}
