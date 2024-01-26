import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  MAX_BOOK_GENRE_CHARACTERS,
  MAX_BOOK_NAME_CHARACTERS,
} from '../constants';
import { CreateAuthorWithIdDto } from '../../author/dto/create-author.dto';

export class CreateBookDto {
  @IsString({ message: 'Book name should be a string' })
  @MaxLength(MAX_BOOK_NAME_CHARACTERS, {
    message: 'Book name max length is 60 characters',
  })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: 'Genre name should be a string' })
  @MaxLength(MAX_BOOK_GENRE_CHARACTERS, {
    message: 'Genre name max length is 40 characters',
  })
  @IsNotEmpty()
  readonly genre: string;

  @IsString({ message: 'Description name should be a string' })
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Book number of pages should be a number' })
  readonly numberOfPages: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Book year should be a number' })
  readonly year: number;

  @ValidateNested({ each: true })
  @Type(() => CreateAuthorWithIdDto)
  @IsNotEmpty()
  readonly author: CreateAuthorWithIdDto;
}
