import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Board } from './board.entity';

@Entity({ name: 'boardColumns' })
export class ColumnEnt {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('int')
  order!: number;

  @Column('text')
  title!: string;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  boardId!: Board;
}
