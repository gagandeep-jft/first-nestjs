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

  async signUp(dto: AuthDto) {
    console.log(dto);
    if (await this.db.addData(dto)) {
      return { status: 200, message: 'user signed up!' };
    }
    return { status: 500, message: 'internal server error' };
  }

  async signin(dto: AuthDto) {
    const result: DataDto = await this.db.getUser(dto);
    if (result) {
      if (dto.password === result.password) {
        return this.signToken(result.id, result.username);
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
    const secret = await this.config.get('JWT_SECRET');
    const access_token = {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret,
      }),
    };
    return access_token;
  }
}
