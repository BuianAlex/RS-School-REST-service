import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import config from './common/ormconfig';

import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
// import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    BoardsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
