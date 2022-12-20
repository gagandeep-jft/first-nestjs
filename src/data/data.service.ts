import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { DataDto } from './dto';
import { db } from './database';

@Injectable({})
export class DataService {
  getData() {
    return { users: db };
  }

  getUser(user: DataDto) {
    return db.filter((current: DataDto) => current.username == user.username);
  }

  getDataById(id: number) {
    return db.filter((user: DataDto) => user.id == id)[0];
  }
  addData(obj: AuthDto) {
    obj.id = db.length > 0 ? db[db.length - 1].id + 1 : 1;
    obj.isAdmin = false;
    db.push(obj);
    return true;
  }

  removeData(id: number) {
    const index: number = db.findIndex((obj: DataDto) => obj.id == id);
    const userInfo: DataDto = db[index];
    db.splice(index, 1);
    return userInfo;
  }

  updateData(id: number, isAdmin: boolean) {
    let isUpdated = false;
    db.forEach((obj: DataDto, index: number) => {
      if (obj.id == id) {
        db[index].isAdmin = isAdmin;
        isUpdated = true;
      }
    });
    return isUpdated;
  }
}
