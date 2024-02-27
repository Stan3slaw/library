import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BookService } from './book.service';
import type { BookResponseDto } from './dto/book.dto';
import type { CreateBookDto } from './dto/create-book.dto';
import type { UpdateBookDto } from './dto/update-book.dto';
import { CreateAuthorWithIdDto } from '../author/dto/create-author.dto';

@Resolver('Book')
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query('books')
  async books(
    @Args('fromTime') fromTime: Date,
    @Args('toTime') toTime: Date,
  ): Promise<BookResponseDto[]> {
    const query = { fromTime: fromTime ?? null, toTime: toTime ?? null };

    return this.bookService.findAll(query);
  }

  @Query('book')
  async book(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<BookResponseDto> {
    return this.bookService.findOne(id);
  }

  @Mutation('createBook')
  async createBook(
    @Args('name', { type: () => String }) name: string,
    @Args('genre', { type: () => String }) genre: string,
    @Args('description', { type: () => String }) description: string,
    @Args('year', { type: () => Int }) year: number,
    @Args('numberOfPages', { type: () => Int }) numberOfPages: number,
    @Args('author') author: CreateAuthorWithIdDto,
  ): Promise<BookResponseDto> {
    const createBookDto: CreateBookDto = {
      name,
      genre,
      description,
      year,
      numberOfPages,
      author,
    };

    return this.bookService.create(createBookDto);
  }

  @Mutation('updateBook')
  async updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { type: () => String }) name: string,
    @Args('genre', { type: () => String }) genre: string,
    @Args('description', { type: () => String }) description: string,
    @Args('year', { type: () => Int }) year: number,
    @Args('numberOfPages', { type: () => Int }) numberOfPages: number,
  ): Promise<BookResponseDto> {
    const updateBookDto: UpdateBookDto = {
      name,
      genre,
      description,
      year,
      numberOfPages,
    };

    return this.bookService.update(id, updateBookDto);
  }

  @Mutation('deleteBook')
  async deleteBook(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.bookService.delete(id);
  }
}
