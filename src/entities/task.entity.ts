import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Board } from './board.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  boardId!: Board;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  userId!: string | null;

  @Column({ type: 'text', nullable: true })
  columnId!: string;
}
