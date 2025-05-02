// src/tokens/tokens.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/token/refresh-token.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: 'kiwi',
      expiresIn: '20s',
    });
  }

  async generateRefreshToken(user: User): Promise<any> {
    const payload = { sub: user.id };
    const refreshToken = await this.jwtService.sign(payload, {
      secret: 'kiwi',
      expiresIn: '40s',
    });
    const entity = this.refreshTokenRepository.create({
      token: refreshToken,
      user,
      expiresAt: new Date(Date.now() + 50 * 1000),
    });
    await this.refreshTokenRepository.save(entity);
    return refreshToken;
  }

  async validateRefreshToken(token: string): Promise<User> {
    const entity = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!entity || entity.expiresAt < new Date()) {
      throw new NotFoundException('Invalid or expired refresh token');
    }
    return entity.user;
  }

  /**
   * 단일 Refresh Token 폐기 (로그아웃 시 사용)
   * @param token 폐기할 토큰 문자열
   */
  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }

  /**
   * 특정 사용자에 발급된 모든 Refresh Token 일괄 폐기
   * @param userId 대상 사용자 ID
   */
  async revokeUserTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }
}
