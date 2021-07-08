import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);
    if (!user) return null;
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) return null;
    return {
      token: this.jwtService.sign({ id: user.id, login: user.login }),
    };
  }
}
