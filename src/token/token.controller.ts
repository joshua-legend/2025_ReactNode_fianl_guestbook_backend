import { Controller } from '@nestjs/common';
import { TokensService } from './token.service';
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokensService) {}
}
