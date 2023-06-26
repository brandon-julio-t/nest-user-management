import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export default class UpdateUserDto {
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
