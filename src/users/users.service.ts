import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    const user = await this.usersRepository.save(newUser);
    return User.toResponse(user);
  }

  async findAll() {
    const usersList = await this.usersRepository.find();
    return usersList.map(User.toResponse);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException();
    return User.toResponse(user);
  }

  findByLogin(login: string) {
    return  this.usersRepository.findOne({ login });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userForUpdate = await this.usersRepository.findOne(id);
    if (!userForUpdate) throw new NotFoundException();
    const updateResult = await this.usersRepository.save({
      ...userForUpdate,
      ...updateUserDto,
    });
    return User.toResponse(updateResult);
  }

  @HttpCode(204)
  async remove(id: string) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
    return;
  }
}
