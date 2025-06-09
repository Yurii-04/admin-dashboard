import { Global, Module } from '@nestjs/common';
import { PrismaService } from './pisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PismaModule {}
