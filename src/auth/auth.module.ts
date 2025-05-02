import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from 'src/token/token.module';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtauthGuard } from './guards/jwtauth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'kiwi',
      signOptions: { expiresIn: '1m' },
    }),
    UsersModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, JwtauthGuard, JwtRefreshGuard],
  exports: [JwtStrategy, JwtRefreshStrategy, JwtRefreshGuard],
})
export class AuthModule {}
