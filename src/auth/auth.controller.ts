import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() user: AuthDto) {
    const oldUser = await this.authService.findUser(user.email);
    if (oldUser) {
      throw new BadRequestException('User already exists');
    }

    return this.authService.createUser(user.email, user.password);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() user: AuthDto) {
    const { email } = await this.authService.validateUser(
      user.email,
      user.password,
    );
    return this.authService.login(email);
  }
}
