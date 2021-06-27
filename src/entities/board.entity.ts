/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ColumnEnt } from './column.entity';
import { Task } from './task.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @OneToMany(() => ColumnEnt, (column) => column.boardId, {
    onDelete: 'CASCADE',
  })
  columns!: ColumnEnt[];

  @OneToMany(() => Task, (task) => task.boardId, { onDelete: 'CASCADE' })
  tasks!: Task[];
}
