import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Board } from "../../boards/entities/board.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column({ type: 'text', nullable: true })
  boardId!: string;

  @Column('int')
  order!: number;

  @Column('text')
  description!: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'text', nullable: true })
  userId!: string;

  @Column({ type: 'text', nullable: true })
  columnId!: string;
}
