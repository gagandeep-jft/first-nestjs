import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { DataService } from 'src/data/data.service';
import { DataDto } from 'src/data/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private db: DataService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
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
        return this.signToken(result[0].id, result[0].username);
      }
    }
    throw new BadRequestException('Invalid Username or Password');
  }

  async signToken(
    id: number,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      username,
    };
    const secret = this.config.get('JWT_SECRET');
    const access_token = {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret,
      }),
    };
    return access_token;
  }
}
