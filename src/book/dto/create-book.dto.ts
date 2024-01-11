import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

import {
  MAX_BOOK_GENRE_CHARACTERS,
  MAX_BOOK_NAME_CHARACTERS,
} from '../constants';
import { CreateAuthorDto } from './create-author.dto';

export class CreateBookDto {
  @MaxLength(MAX_BOOK_NAME_CHARACTERS, {
    message: 'Book name max length is 60 characters',
  })
  @IsNotEmpty()
  readonly name: string;

  @MaxLength(MAX_BOOK_GENRE_CHARACTERS, {
    message: 'Genre name max length is 40 characters',
  })
  @IsNotEmpty()
  readonly genre: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly numberOfPages: number;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  readonly author: CreateAuthorDto;
}
