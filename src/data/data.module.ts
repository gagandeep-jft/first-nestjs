import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  controllers: [DataController],
  providers: [AuthService, DataService],
  exports: [DataService],
})
export class DataModule {}
