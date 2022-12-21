import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, ConfigService],
})
export class PrismaModule {}
