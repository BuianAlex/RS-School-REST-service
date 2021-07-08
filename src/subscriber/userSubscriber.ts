import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './../users/entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to User events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before user saved.
   */
  beforeInsert(event: InsertEvent<User>) {
    const { entity } = event;
    entity.password = bcrypt.hashSync(event.entity.password, 10);
  }
}
