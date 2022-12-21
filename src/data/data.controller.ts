import {
  Body,
  Controller,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private db: DataService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getData() {
    return this.db.getData();
  }

  @Get('/:id')
  getUserById(@Param('id', new ParseIntPipe()) id: number) {
    return { user: this.db.getDataById(id) };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put('/update/:id')
  updateInfo(
    @Param('id', new ParseIntPipe()) id: number,
    @Body('isAdmin', new ParseBoolPipe()) isAdmin: boolean,
  ) {
    return this.db.updateData(id, isAdmin);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete('/delete/:id')
  deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.db.removeData(id);
  }
}
