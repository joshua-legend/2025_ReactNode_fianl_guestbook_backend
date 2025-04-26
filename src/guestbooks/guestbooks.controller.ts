import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuestbooksService } from './guestbooks.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';

@Controller('guestbooks')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}

  @Post()
  create(@Body() createGuestbookDto: CreateGuestbookDto) {
    return this.guestbooksService.create(createGuestbookDto);
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
  update(
    @Param('id') id: string,
    @Body() updateGuestbookDto: UpdateGuestbookDto,
  ) {
    return this.guestbooksService.update(+id, updateGuestbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbooksService.remove(+id);
  }
}
