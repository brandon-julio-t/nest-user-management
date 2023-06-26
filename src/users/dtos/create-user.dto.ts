import { IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  address: string;
}
