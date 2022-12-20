import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { DataService } from 'src/data/data.service';
import { DataDto } from 'src/data/dto';

@Injectable({})
export class AuthService {
  constructor(private db: DataService) {}
  signUp(dto: AuthDto) {
    if (this.db.addData(dto)) {
      return { status: 200, message: 'user signed up!' };
    }
    return { status: 500, message: 'internal server error' };
  }
  signin(dto: AuthDto) {
    const result: DataDto[] = this.db.getUser(dto);
    if (result.length == 1) {
      if (dto.password === result[0].password) {
        return { user: result[0] };
      }
    }
    return {};
  }
}
