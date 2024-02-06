import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'user name should be a string' })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: 'user surname should be a string' })
  @IsNotEmpty()
  readonly surname: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
