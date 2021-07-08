import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Board } from './entities/board.entity';
import { ColumnEnt } from '../columns/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, ColumnEnt])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
