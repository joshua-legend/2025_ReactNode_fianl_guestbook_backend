import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/token/token.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userRepository.findOne({
      where: { name: dto.username },
    });
    if (exists) throw new ConflictException('이미 존재하는 유저입니다.');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({
      name: dto.username,
      password: hashedPassword, // Entity 훅에서 해싱 처리됨
    });
    await this.userRepository.save(user);
    return { message: '회원가입 성공' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { name: dto.username },
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const accessToken = await this.tokensService.generateAccessToken(user);
    const refreshToken = await this.tokensService.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }
}
