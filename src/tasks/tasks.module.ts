import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { config } from './../common/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({
      secret: config['JWT_SECRET_KEY'],
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
