import {
  ForbiddenException,
  HttpCode,
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    let result;
    try {
      result = await this.authService.login(
        loginUserDto.login,
        loginUserDto.password
      );
    } catch (error) {
      return error;
    }
    if (!result) throw new ForbiddenException();
    return result;
  }
}
