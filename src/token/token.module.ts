import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokensService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken]), JwtModule],
  controllers: [TokenController],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokenModule {}
