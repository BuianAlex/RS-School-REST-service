import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerString = request.header('Authorization');
    if (!headerString) throw new UnauthorizedException();
    const [type, token] = headerString.split(' ');
    if (type !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      const result = await this.jwtService.verifyAsync(token);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      new UnauthorizedException();
    }
    return false;
  }
}
