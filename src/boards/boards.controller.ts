import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FastifyReply } from 'fastify';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
// import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IBoardToResponse } from './entities/board.entity';
@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto
  ): Promise<IBoardToResponse> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll(): Promise<IBoardToResponse[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<IBoardToResponse | undefined> {
    const findResult = await this.boardsService.findOne(id);
    if (!findResult) throw new NotFoundException();
    return findResult;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<IBoardToResponse | undefined> {
    const updateResult = await this.boardsService.update(id, updateBoardDto);
    if (!updateResult) throw new NotFoundException();
    return updateResult;
  }

  @Delete(':id')
  async remove(
    @Res({ passthrough: true }) res: Response | FastifyReply,
    @Param('id') id: string
  ): Promise<void> {
    const deleteResult = await this.boardsService.remove(id);
    if (!deleteResult) throw new NotFoundException();
    res.status(HttpStatus.NO_CONTENT);
  }
}
