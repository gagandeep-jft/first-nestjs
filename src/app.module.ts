import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, DataModule, ConfigModule.forRoot({})],
  controllers: [],
  providers: [],
})
export class AppModule {}
