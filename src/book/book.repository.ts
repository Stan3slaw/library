import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import type { CreateUpdateBookWithAuthor } from './interfaces/create-update-book.interface';
import type { GetBooksQueryDto } from './dto/get-books-query.dto';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(bookWithAuthor: CreateUpdateBookWithAuthor): Promise<Book> {
    const createdBook = this.bookRepository.create(bookWithAuthor);
    await this.bookRepository.save(createdBook);

    return createdBook;
  }

  async findAll(query: GetBooksQueryDto): Promise<Book[]> {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');

    if (query.fromTime) {
      queryBuilder.andWhere('book.created_at >= :fromTime', {
        fromTime: query.fromTime,
      });
    }

    if (query.toTime) {
      queryBuilder.andWhere('book.created_at <= :toTime', {
        toTime: query.toTime,
      });
    }

    const foundBooks = await queryBuilder.getMany();

    return foundBooks;
  }

  async findOne(bookId: number): Promise<Book> {
    const foundBook = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['author'],
    });

    return foundBook;
  }

  async update(book: Book): Promise<Book> {
    const updatedBook = await this.bookRepository.save(book);

    return updatedBook;
  }

  async delete(bookId: number): Promise<void> {
    await this.bookRepository.delete({ id: bookId });
  }
}
