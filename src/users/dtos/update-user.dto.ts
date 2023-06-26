import { IsNotEmpty } from 'class-validator';

export default class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  address: string;
}
