import { Controller, Get } from '@nestjs/common';

@Controller('auth/register')
export class RegisterController {
  @Get()
  register(): string {
    return 'Register';
  }
}
