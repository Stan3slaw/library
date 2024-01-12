import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import type { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { author: authorDto, ...bookDto } = createBookDto;

    let author = await this.authorRepository.findOne({
      where: { id: authorDto.id },
    });

    if (!author) {
      author = await this.authorRepository.create(authorDto);
      await this.authorRepository.save(author);
    }

    const createdBook = await this.bookRepository.create({
      name: bookDto.name,
      genre: bookDto.genre,
      description: bookDto.description,
      number_of_pages: bookDto.numberOfPages,
      year: bookDto.year,
      author,
    });

    return this.bookRepository.save(createdBook);
  }

  async findAll(): Promise<Book[]> {
    const books = await this.bookRepository.find({ relations: ['author'] });

    return books;
  }

  async findOne(bookId: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async delete(bookId: number): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    this.bookRepository.delete({ id: bookId });
  }
}
