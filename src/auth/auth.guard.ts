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

    // const headerString = request.header('Authorization');
    // const headerString = request.getHeader('Authorization');
    console.log(request.headers);
    return true;

    // if (!headerString) throw new UnauthorizedException();
    // const [type, token] = headerString.split(' ');
    // if (type !== 'Bearer' || !token) throw new UnauthorizedException();
    // try {
    //   await this.jwtService.verifyAsync(token);
    //   return true;
    // } catch (error) {
    //   throw new UnauthorizedException();
    // }
  }
}
