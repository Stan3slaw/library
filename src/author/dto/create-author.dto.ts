import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

import {
  MAX_AUTHOR_NAME_CHARACTERS,
  MAX_AUTHOR_SURNAME_CHARACTERS,
} from '../../book/constants';

export class CreateAuthorDto {
  @IsNumber()
  @IsNumber({}, { message: 'Author id should be a number' })
  readonly id?: number;

  @MaxLength(MAX_AUTHOR_NAME_CHARACTERS, {
    message: 'Author name max length is 60 characters',
  })
  @IsNotEmpty()
  readonly name: string;

  @MaxLength(MAX_AUTHOR_SURNAME_CHARACTERS, {
    message: 'Author surname max length is 60 characters',
  })
  @IsNotEmpty()
  readonly surname: string;
}
