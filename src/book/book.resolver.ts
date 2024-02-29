import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { VoidResolver } from 'graphql-scalars';

import { BookService } from './book.service';
import type { BookResponseDto } from './dto/book.dto';
import { CreateBookArgs } from './args/create-book.args';
import { UpdateBookArgs } from './args/update-book.args';
import { Book } from './models/book.model';
import { GetBooksArgs } from './args/get-books.args';

@Resolver('Book')
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Book])
  async books(@Args() getBooksArgs: GetBooksArgs): Promise<BookResponseDto[]> {
    return this.bookService.findAll(getBooksArgs);
  }

  @Query(() => Book)
  async book(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<BookResponseDto> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async createBook(
    @Args() createBookArgs: CreateBookArgs,
  ): Promise<BookResponseDto> {
    const createdBook = await this.bookService.create(createBookArgs);
    this.pubSub.publish('onNewBookAdded', { addedBook: createdBook });

    return createdBook;
  }

  @Mutation(() => Book)
  async updateBook(
    @Args() updateBookArgs: UpdateBookArgs,
  ): Promise<BookResponseDto> {
    const { id, ...updateBookDto } = updateBookArgs;

    return this.bookService.update(id, updateBookDto);
  }

  @Mutation(() => VoidResolver, { nullable: true })
  async deleteBook(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.bookService.delete(id);
  }

  @Subscription(() => Book, { name: 'addedBook' })
  onNewBookAdded(): AsyncIterator<Book> {
    return this.pubSub.asyncIterator<Book>('onNewBookAdded');
  }
}
