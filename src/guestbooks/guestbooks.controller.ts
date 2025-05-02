import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GuestbooksService } from './guestbooks.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { JwtauthGuard } from 'src/auth/guards/jwtauth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: { userId: number };
}

@Controller('guestbooks')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}
  @UseGuards(JwtauthGuard)
  @Get('/profile')
  getProfile() {
    return { message: '이곳에 도달했다면 인증 성공!' };
  }
  @UseGuards(JwtauthGuard)
  @Post()
  create(@Body() createGuestbookDto: CreateGuestbookDto, @Req() req: RequestWithUser) {
    const { userId } = req.user;
    return this.guestbooksService.create(createGuestbookDto, userId);
  }

  @Get()
  findAll() {
    return this.guestbooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestbooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestbookDto: UpdateGuestbookDto) {
    return this.guestbooksService.update(+id, updateGuestbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbooksService.remove(+id);
  }
}
