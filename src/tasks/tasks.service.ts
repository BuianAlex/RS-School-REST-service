import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newTask);
  }

  findAll(boardId: string) {
    return this.tasksRepository.find({ where: { boardId } });
  }

  findOne(boardId: string, taskId: string) {
    return this.tasksRepository.findOne({ where: { boardId, id: taskId } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const oldTask = await this.tasksRepository.findOne(id);
    if (!oldTask) return undefined;
    const updateTaskResult = await this.tasksRepository.save({
      ...oldTask,
      ...updateTaskDto,
    });
    return updateTaskResult;
  }

  async remove(id: string) {
    const deleteTaskResult = await this.tasksRepository.delete(id);
    const { affected } = deleteTaskResult;
    if (!affected) return undefined;
    return true;
  }
}
