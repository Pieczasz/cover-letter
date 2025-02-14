import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: { email: string; password: string }) {
    // TODO: Validate credentials and return a token or session data
    return this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() userData: any) {
    // TODO: Create a new user account
    return this.authService.register(userData);
  }
}
