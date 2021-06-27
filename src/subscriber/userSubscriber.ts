/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import bcrypt from 'bcryptjs';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';

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
