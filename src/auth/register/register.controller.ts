import { Controller, Post, Req, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async register(@Req() request: Request): Promise<Record<string, any>> {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      throw new BadRequestException('Name, email, and password are required');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prismaService.prisma().users.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return { message: 'User created successfully', userId: user.id };
    } catch (error) {
      console.error(error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already registered');
        }
      }

      throw new BadRequestException('Failed to register user');
    } finally {
      await this.prismaService.prisma().$disconnect();
    }
  }
}
