import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { TokensService } from 'src/token/token.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    return await this.authService.signup(signupDto);
  }
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    console.log('login');
    const { accessToken, refreshToken } = await this.authService.login(dto);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 3 * 60 * 1000, //
    });
    return { accessToken, message: '로그인 성공' };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshTokens(@Req() req, @Res({ passthrough: true }) res) {
    console.log('리프레쉬 토큰 발생한다고');
    console.log(req.user);
    const { userId } = req.user;
    const accessToken = await this.tokensService.generateAccessToken(userId);
    const refreshToken = await this.tokensService.generateRefreshToken(userId);
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 3 * 60 * 1000, //
    });
    return { accessToken, message: '토큰 갱신 성공' };
  }
}
