import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  address: string;
}
