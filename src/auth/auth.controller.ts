import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: AuthDto) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  async signin(@Body() body: AuthDto) {
    return await this.authService.signin(body);
  }
}
