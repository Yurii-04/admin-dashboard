import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../../common/enums';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
