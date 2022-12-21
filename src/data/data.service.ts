import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataDto } from './dto';

@Injectable({})
export class DataService {
  constructor(private db: PrismaService) {}

  async getData() {
    return { users: await this.db.user.findMany() };
  }

  async getUser(user: AuthDto) {
    console.log(user);
    return await this.db.user.findFirst({
      where: { username: user.username },
    });
  }

  async getDataById(id: number) {
    return await this.db.user.findUnique({
      where: { id },
    });
  }

  async addData(obj: AuthDto) {
    const user = await this.db.user.create({
      data: {
        username: obj.username,
        password: obj.password,
        isAdmin: false,
      },
    });
    return Boolean(user.id);
  }

  async removeData(id: number) {
    const userInfo = this.db.user.findUnique({
      where: {
        id,
      },
    });
    const result = await this.db.user.delete({ where: { id } });
    console.log(result);
    return userInfo;
  }

  async updateData(id: number, isAdmin: boolean) {
    const result = await this.db.user.update({
      where: { id },
      data: {
        isAdmin,
      },
    });
    console.log(result);
    return true;
  }
}
