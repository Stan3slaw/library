import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { VoidResolver } from 'graphql-scalars';

import { BookService } from './book.service';
import type { BookResponseDto } from './dto/book.dto';
import { CreateBookArgs } from './args/create-book.args';
import { UpdateBookArgs } from './args/update-book.args';
import { Book } from './models/book.model';
import { DateScalar } from '../common/scalars/date.scalar';

@Resolver('Book')
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books(
    @Args('fromTime', { type: () => DateScalar }) fromTime: Date,
    @Args('toTime', { type: () => DateScalar }) toTime: Date,
  ): Promise<BookResponseDto[]> {
    const query = { fromTime: fromTime ?? null, toTime: toTime ?? null };

    return this.bookService.findAll(query);
  }

  @Query(() => Book)
  async book(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<BookResponseDto> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async createBook(
    @Args('createBookArgs', { type: () => CreateBookArgs })
    createBookArgs: CreateBookArgs,
  ): Promise<BookResponseDto> {
    return this.bookService.create(createBookArgs);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args() updateBookArgs: UpdateBookArgs,
  ): Promise<BookResponseDto> {
    const { id, ...updateBookDto } = updateBookArgs;

    return this.bookService.update(id, updateBookDto);
  }

  @Mutation(() => VoidResolver)
  async deleteBook(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.bookService.delete(id);
  }
}
