import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorService } from 'src/author/author.service';
import type { Author } from 'src/author/entities/author.entity';
import { Book } from './entities/book.entity';
import type { CreateBookDto } from './dto/create-book.dto';
import type { UpdateBookDto } from './dto/update-book.dto';
import type { BookResponseDto } from './dto/book.dto';
import type { GetBooksQueryDto } from './dto/get-books-query.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private readonly authorService: AuthorService,
  ) {}

  private static mapBookEntityToBookResponseDto(
    bookEntity: Book,
  ): BookResponseDto {
    return {
      id: bookEntity.id,
      name: bookEntity.name,
      genre: bookEntity.genre,
      description: bookEntity.description,
      numberOfPages: bookEntity.number_of_pages,
      year: bookEntity.year,
      createdAt: bookEntity.created_at,
      updatedAt: bookEntity.updated_at,
      author: {
        id: bookEntity.author.id,
        name: bookEntity.author.name,
        surname: bookEntity.author.surname,
      },
    };
  }

  async create(createBookDto: CreateBookDto): Promise<BookResponseDto> {
    const { author: authorDto, ...bookDto } = createBookDto;

    let author: Author | null = null;

    if (authorDto.id) {
      author = await this.authorService.findOne(authorDto.id);
    }

    if (!author) {
      author = await this.authorService.create({
        name: authorDto.name,
        surname: authorDto.surname,
      });
    }

    const createdBook = this.bookRepository.create({
      name: bookDto.name,
      genre: bookDto.genre,
      description: bookDto.description,
      number_of_pages: bookDto.numberOfPages,
      year: bookDto.year,
      author,
    });
    await this.bookRepository.save(createdBook);

    return BookService.mapBookEntityToBookResponseDto(createdBook);
  }

  async findAll(query: GetBooksQueryDto): Promise<BookResponseDto[]> {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');

    if (query.date) {
      queryBuilder.andWhere('DATE(book.created_at) = :date', {
        date: query.date,
      });
    }

    if (query.fromTime) {
      queryBuilder.andWhere(
        'CAST(book.created_at AS TIME) >= CAST(:fromTime AS TIME)',
        {
          fromTime: query.fromTime,
        },
      );
    }

    if (query.toTime) {
      queryBuilder.andWhere(
        'CAST(book.created_at AS TIME) <= CAST(:toTime AS TIME)',
        {
          toTime: query.toTime,
        },
      );
    }

    const books = await queryBuilder.getMany();

    const mappedBooks = books.map((book) =>
      BookService.mapBookEntityToBookResponseDto(book),
    );

    return mappedBooks;
  }

  async findOne(bookId: number): Promise<BookResponseDto> {
    if (!bookId) {
      throw new HttpException(
        'Book id is not specified',
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['author'],
    });

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    return BookService.mapBookEntityToBookResponseDto(book);
  }

  async update(
    bookId: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const foundBook = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['author'],
    });

    if (!foundBook) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    const updatedBook = await this.bookRepository.save({
      ...foundBook,
      ...updateBookDto,
    });

    return BookService.mapBookEntityToBookResponseDto(updatedBook);
  }

  async delete(bookId: number): Promise<void> {
    await this.findOne(bookId);

    this.bookRepository.delete({ id: bookId });
  }
}
