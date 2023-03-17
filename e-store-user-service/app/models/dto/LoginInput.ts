import { IsEmail, Length } from 'class-validator';

export class LoginInput {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
  @Length(6, 32)
  password: string;
}
