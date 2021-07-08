import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

import { config } from './../common/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: config['JWT_SECRET_KEY'],
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
