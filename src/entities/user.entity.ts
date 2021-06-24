import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// import { IUser } from './user.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true })
  name!: string;

  @Column({ type: 'text', unique: true })
  login!: string;

  @Column('text')
  password!: string;

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
