import {
  Body,
  Controller,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private db: DataService) {}

  @Get()
  getData() {
    return this.db.getData();
  }

  @Get('/:id')
  getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return { user: this.db.getDataById(id) };
  }

  @Put('/update/:id')
  updateInfo(
    @Param('id', new ParseIntPipe()) id: number,
    @Body('isAdmin', new ParseBoolPipe()) isAdmin: boolean,
  ) {
    return this.db.updateData(id, isAdmin);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.db.removeData(id);
  }
}
