import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestbooksService } from './guestbooks.service';
import { GuestbooksController } from './guestbooks.controller';
import { Guestbook } from './entities/guestbook.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Guestbook]), UsersModule],
  controllers: [GuestbooksController],
  providers: [GuestbooksService],
})
export class GuestbooksModule {}
