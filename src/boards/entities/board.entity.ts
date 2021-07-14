/* eslint-disable import/no-cycle */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ColumnEnt } from '../../columns/entities/column.entity';

export interface IBoardToResponse {
  id: string;
  title: string;
  columns: Omit<ColumnEnt, 'boardId'>[];
}
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

  static toResponse(board: Board): IBoardToResponse {
    const { columns, ...restParam } = board;
    const cleanedColumns = columns.map((item) => {
      const { id, order, title } = item;
      return { id, order, title };
    });
    return { ...restParam, ...{ columns: cleanedColumns } };
  }
}
