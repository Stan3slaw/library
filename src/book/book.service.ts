import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AuthorService } from 'src/author/author.service';
import type { Author } from 'src/author/entities/author.entity';
import type { CreateBookDto } from './dto/create-book.dto';
import type { UpdateBookDto } from './dto/update-book.dto';
import type { BookResponseDto } from './dto/book-response.dto';
import type { GetBooksQueryDto } from './dto/get-books-query.dto';
import type { Book } from './entities/book.entity';
import { BookRepository } from './book.repository';
import type {
  CreateUpdateBook,
  CreateUpdateBookWithAuthor,
} from './interfaces/create-update-book.interface';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
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

  private static mapCreateBookDtoToBookEntity(
    createBookDto: CreateBookDto,
    author: Author,
  ): CreateUpdateBookWithAuthor {
    return {
      name: createBookDto.name,
      genre: createBookDto.genre,
      description: createBookDto.description,
      number_of_pages: createBookDto.numberOfPages,
      year: createBookDto.year,
      author,
    };
  }

  private static mapUpdateBookDtoToBookEntity(
    book: Book,
    updateBookDto: UpdateBookDto,
  ): CreateUpdateBook {
    return {
      name: updateBookDto.name ?? book.name,
      genre: updateBookDto.genre ?? book.genre,
      description: updateBookDto.description ?? book.description,
      number_of_pages: updateBookDto.numberOfPages ?? book.number_of_pages,
      year: updateBookDto.year ?? book.year,
    };
  }

  async create(createBookDto: CreateBookDto): Promise<BookResponseDto> {
    const { author: authorDto } = createBookDto;

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

    const createdBook = await this.bookRepository.create(
      BookService.mapCreateBookDtoToBookEntity(createBookDto, author),
    );

    return BookService.mapBookEntityToBookResponseDto(createdBook);
  }

  async findAll(query: GetBooksQueryDto): Promise<BookResponseDto[]> {
    const foundBooks = await this.bookRepository.findAll(query);

    const mappedBooks = foundBooks.map((book) =>
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

    const foundBook = await this.bookRepository.findOne(bookId);

    if (!foundBook) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    return BookService.mapBookEntityToBookResponseDto(foundBook);
  }

  async update(
    bookId: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const foundBook = await this.bookRepository.findOne(bookId);

    if (!foundBook) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    const updatedBook = await this.bookRepository.update({
      ...foundBook,
      ...BookService.mapUpdateBookDtoToBookEntity(foundBook, updateBookDto),
    });

    return BookService.mapBookEntityToBookResponseDto(updatedBook);
  }

  async delete(bookId: number): Promise<void> {
    await this.findOne(bookId);
    await this.bookRepository.delete(bookId);
  }
}
