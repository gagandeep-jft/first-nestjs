import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  id?: number;
  isAdmin?: boolean;
}

export class updatePrivilegesDto {
  id: number;
  isAdmin: boolean;
}
