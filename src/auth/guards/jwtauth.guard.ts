import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtauthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: Error) {
    if (err || !user) throw new UnauthorizedException('토큰이 유효하지 않습니다');
    return user;
  }
}
