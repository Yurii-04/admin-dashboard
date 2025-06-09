import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../types/jwtPayload.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    const rtSecret = config.get<string>('RT_SECRET');
    if (!rtSecret) {
      throw new Error('AT_SECRET is not defined');
    }
    super({
      jwtFromRequest: RtStrategy.extractJwtFromCookies,
      secretOrKey: rtSecret,
      passReqToCallback: true,
    });
  }

  private static extractJwtFromCookies(req: Request): string | null {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token not found in cookies');
    }
    return refreshToken;
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new ForbiddenException('Refresh token malformed');
    }
    return { ...payload, refreshToken };
  }
}
