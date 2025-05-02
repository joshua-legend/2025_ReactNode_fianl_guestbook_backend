import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    console.log('▶ JwtRefreshGuard.canActivate');
    return super.canActivate(context); // 반드시 super 호출
  }
  handleRequest(err: any, user: any, info: any) {
    console.log('▶ JwtRefreshGuard.handleRequest', { err, user, info });

    // 1) 서명 불일치나 만료 등으로 info가 있으면
    if (info) {
      // info.name === 'TokenExpiredError' 등으로 구분 가능
      console.log('info', info);
      throw new UnauthorizedException(`Refresh token error: ${info.message}`);
    }

    // 2) err가 있거나 user가 falsey하면
    if (err || !user) {
      console.log('err', err);
      throw err || new UnauthorizedException('Refresh token validation failed');
    }

    // 3) 정상적일 때만 user를 반환 → req.user에 할당
    return user;
  }
}
