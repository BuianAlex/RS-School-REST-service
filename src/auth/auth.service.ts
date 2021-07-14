import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(
    login: string,
    password: string
  ): Promise<{ token: string } | undefined> {
    const user = await this.usersService.findByLogin(login);
    if (!user) return undefined;
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) return undefined;
    return {
      token: this.jwtService.sign({ id: user.id, login: user.login }),
    };
  }
}
