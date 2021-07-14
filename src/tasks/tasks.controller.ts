import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  NotFoundException,
  BadRequestException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FastifyReply } from 'fastify';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<CreateTaskDto> {
    const { ...newTaskData } = createTaskDto;
    newTaskData.boardId = boardId;
    return this.tasksService.create(newTaskData);
  }

  /**
   * Get all tasks by boardId
   * @param boardId
   * @returns  Promise<Task[]>
   */
  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string): Promise<CreateTaskDto[]> {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(
    @Param() params: { [key: string]: string }
  ): Promise<CreateTaskDto> {
    const { boardId, taskId } = params;
    if (!boardId || !taskId) throw new BadRequestException();
    const findResult = await this.tasksService.findOne(boardId, taskId);
    if (!findResult) throw new NotFoundException();
    return findResult;
  }

  @Put(':boardId/tasks/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<CreateTaskDto> {
    const updateTaskResult = await this.tasksService.update(id, updateTaskDto);
    if (!updateTaskResult) throw new NotFoundException();
    return updateTaskResult;
  }

  @Delete(':boardId/tasks/:id')
  async remove(
    @Res({ passthrough: true }) res: Response | FastifyReply,
    @Param('id') id: string
  ): Promise<void> {
    const deleteResult = await this.tasksService.remove(id);
    if (!deleteResult) throw new NotFoundException();
    res.status(HttpStatus.NO_CONTENT);
  }
}
