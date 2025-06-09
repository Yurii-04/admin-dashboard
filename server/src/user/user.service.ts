import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HashingService } from '../hashing/hashing.service';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async save(dto: RegisterDto) {
    const hashedPassword = await this.hashingService.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        hashedPassword,
        role: dto.role,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      omit: {
        hashedRt: true,
        hashedPassword: true,
      },
      where: { id: userId },
    });
  }
}
