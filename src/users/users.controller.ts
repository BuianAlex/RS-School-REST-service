import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  NotFoundException,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FastifyReply } from 'fastify';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto
  ): Promise<Partial<CreateUserDto>> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Partial<CreateUserDto>[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<Partial<CreateUserDto>> {
    const findResult = await this.usersService.findOne(id);
    if (!findResult) throw new NotFoundException();
    return findResult;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<Partial<CreateUserDto> | undefined> {
    const updateResult = this.usersService.update(id, updateUserDto);
    if (!updateResult) throw new NotFoundException();
    return updateResult;
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response | FastifyReply,
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<void> {
    const deleteResult = await this.usersService.remove(id);
    if (!deleteResult) throw new NotFoundException();
    res.status(HttpStatus.NO_CONTENT);
  }
}
