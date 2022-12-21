import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  controllers: [DataController],
  providers: [
    AuthService,
    DataService,
    JwtService,
    ConfigService,
    PrismaService,
  ],
  exports: [DataService],
})
export class DataModule {}
