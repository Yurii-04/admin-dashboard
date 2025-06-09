import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Tokens } from './types';
import { JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HashingService } from '../hashing/hashing.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private EXPIRE_DAY_REFRESH_TOKEN: number = 15;

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(dto: RegisterDto) {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.save(dto);

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRt(user.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Wrong email or password');
    }

    const passwordMatches = this.hashingService.compare(
      dto.password,
      user.hashedPassword,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Wrong email or password');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRt(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt: null },
    });
  }

  private async getTokens(userId: string, email: string, role: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      role
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: this.EXPIRE_DAY_REFRESH_TOKEN + 'd',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async updateRt(userId: string, rt: string): Promise<void> {
    const hashedRt = await this.hashingService.hash(rt, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { hashedRt },
    });
  }

  async addRtToResponse(res: Response, rt: string) {
    res.cookie('refreshToken', rt, {
      ...this.getCookieOptions(),
    });
  }

  private getCookieOptions() {
    return {
      httpOnly: true,
      sameSite: 'strict' as const,
    };
  }

  async removeRtFromResponse(res: Response) {
    res.clearCookie('refreshToken', this.getCookieOptions());
  }


  async refreshTokens(userId: string, rt: string):Promise<Tokens> {
    const user = await this.userService.findById(userId);
    if (!user?.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await this.hashingService.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRt(user.id, tokens.refreshToken);

    return tokens;

  }
}
