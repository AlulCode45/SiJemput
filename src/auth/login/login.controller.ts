import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/login')
export class LoginController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async login(@Req() request: Request): Promise<Record<string, any>> {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      throw new BadRequestException('Email / password tidak boleh kosong');
    }

    try {
      const user = await this.prismaService.prisma().users.findFirstOrThrow({
        where: {
          email: email,
        },
      });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Email atau password salah');
      }

      const token = await this.jwtService.signAsync(user);

      return {
        message: 'Login sukses',
        userId: user.id,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Email atau password salah');
    }
  }
}
