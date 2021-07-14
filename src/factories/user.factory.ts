import bcrypt from 'bcryptjs';

import { define } from 'typeorm-seeding';
import { User } from '../users/entities/user.entity';

define(User, () => {
  const user = new User();
  user.login = 'admin';
  user.password = bcrypt.hashSync('admin', 10);
  return user;
});
