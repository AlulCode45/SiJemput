import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController, LoginController, RegisterController],
  providers: [PrismaService],
})
export class AuthModule {}
