import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signup(dto: CreateUserDto): Promise<User> {
    const exists = await this.userRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('이미 존재하는 유저입니다.');
    const user = this.userRepo.create({
      name: dto.name,
      password: dto.password, // Entity 훅에서 해싱 처리됨
    });
    return this.userRepo.save(user);
  }

  async login(dto: LoginDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { name: dto.username } });
    if (!user) throw new UnauthorizedException('존재하지 않는 유저입니다.');
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    return user;
  }
}
