import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          console.log('cookies on request:', request.cookies);
          return request?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: 'kiwi',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    console.log({ payload });
    const user = await this.usersService.findOne(payload.sub);
    console.log(user);
    return { userId: user.id };
  }
}
