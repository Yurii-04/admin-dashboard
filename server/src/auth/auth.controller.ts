import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response, Request } from 'express'
import { GetCurrentUserId, Public } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AccessToken } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  async signUp(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { accessToken, refreshToken } = await this.authService.signUp(dto);
    await this.authService.addRtToResponse(res, refreshToken)
    return { accessToken };
  }

  @Public()
  @Post('/sign-in')
  async signIn(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { accessToken, refreshToken } = await this.authService.signIn(dto);
    await this.authService.addRtToResponse(res, refreshToken)
    return { accessToken };
  }

  @Post('/sign-out')
  async logout(
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    await this.authService.logout(userId);
    await this.authService.removeRtFromResponse(res)
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refresh(
    @GetCurrentUserId() userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    const { refreshToken: refreshTokenFromCookies } = req.cookies;
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      userId,
      refreshTokenFromCookies,
    );
    await this.authService.addRtToResponse(res, refreshToken);

    return { accessToken };

  }
}
