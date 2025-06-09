import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { HashingModule } from '../hashing/hashing.module';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  imports: [UserModule, JwtModule.register({}), HashingModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})

export class AuthModule {}
