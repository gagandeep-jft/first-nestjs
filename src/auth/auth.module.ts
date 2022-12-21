import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DataModule } from 'src/data/data.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [DataModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
