import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PismaModule } from './pisma/pisma.module';
import { UserModule } from './user/user.module';
import { HashingModule } from './hashing/hashing.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PismaModule,
    UserModule,
    HashingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
