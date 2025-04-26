import { Controller, Get } from '@nestjs/common';

@Controller('auth/login')
export class LoginController {
  @Get()
  login(): string {
    return 'Login';
  }
}
