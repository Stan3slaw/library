import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

import {
  MAX_BOOK_GENRE_CHARACTERS,
  MAX_BOOK_NAME_CHARACTERS,
} from '../constants';
import { CreateAuthorWithIdDto } from '../../author/dto/create-author.dto';

export class CreateBookDto {
  @IsString({ message: 'book name should be a string' })
  @MaxLength(MAX_BOOK_NAME_CHARACTERS, {
    message: 'book name max length is 60 characters',
  })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: 'genre name should be a string' })
  @MaxLength(MAX_BOOK_GENRE_CHARACTERS, {
    message: 'genre name max length is 40 characters',
  })
  @IsNotEmpty()
  readonly genre: string;

  @IsString({ message: 'description should be a string' })
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'book number of pages should be a number' })
  readonly numberOfPages: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'book year should be a number' })
  readonly year: number;

  @IsNotEmpty()
  readonly author: CreateAuthorWithIdDto;
}
