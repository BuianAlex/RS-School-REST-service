import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { Board } from './entities/board.entity';
import { ColumnEnt } from '../columns/entities/column.entity';
import { config } from './../common/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([Board, ColumnEnt]),
    JwtModule.register({
      secret: config['JWT_SECRET_KEY'],
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
