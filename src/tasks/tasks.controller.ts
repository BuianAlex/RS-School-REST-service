import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto
  ) {
    createTaskDto.boardId = boardId;
    return this.tasksService.create(createTaskDto);
  }
  /**
   * Get all tasks by boardId
   * @param boardId
   * @returns  Promise<Task[]>
   */
  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(@Param() params: { [key: string]: string }) {
    const { boardId, taskId } = params;
    if (!boardId || !taskId) throw new BadRequestException();
    const findResult = await this.tasksService.findOne(boardId, taskId);
    if (!findResult) throw new NotFoundException();
    return findResult;
  }

  @Put(':boardId/tasks/:id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updateTaskResult = await this.tasksService.update(id, updateTaskDto);
    if (!updateTaskResult) throw new NotFoundException();
    return updateTaskResult;
  }

  @Delete(':boardId/tasks/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
