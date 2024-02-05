import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

import {
  MAX_AUTHOR_NAME_CHARACTERS,
  MAX_AUTHOR_SURNAME_CHARACTERS,
} from '../../book/constants';

export class CreateAuthorDto {
  @MaxLength(MAX_AUTHOR_NAME_CHARACTERS, {
    message: 'author name max length is 60 characters',
  })
  @IsNotEmpty()
  readonly name: string;

  @MaxLength(MAX_AUTHOR_SURNAME_CHARACTERS, {
    message: 'author surname max length is 60 characters',
  })
  @IsNotEmpty()
  readonly surname: string;
}

export class CreateAuthorWithIdDto extends CreateAuthorDto {
  @IsOptional()
  @IsNumber({}, { message: 'author id should be a number' })
  readonly id?: number;
}
