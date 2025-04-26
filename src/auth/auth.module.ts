import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';

@Module({
  controllers: [AuthController, LoginController, RegisterController],
})
export class AuthModule {}
