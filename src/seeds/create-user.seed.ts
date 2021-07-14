/* eslint-disable class-methods-use-this */
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../users/entities/user.entity';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().create();
  }
}
