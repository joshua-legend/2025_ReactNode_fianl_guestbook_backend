import { IsString, IsEmail, MinLength } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import { BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(4)
  password: string;
}
