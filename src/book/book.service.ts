import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthorService } from 'src/author/author.service';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import type { CreateBookDto } from './dto/create-book.dto';
import type { UpdateBookDto } from './dto/update-book.dto';
import type { BookResponseDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
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

    const author = await this.authorService.findOneOrCreate(authorDto);

    const createdBook = await this.bookRepository.create({
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

  async findAll(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({ relations: ['author'] });

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

    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    return BookService.mapBookEntityToBookResponseDto(book);
  }

  async update(
    bookId: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const foundBook = await this.findOne(bookId);

    if (!foundBook) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    const author = await this.authorService.findOneOrCreate(
      updateBookDto.author,
    );

    const updatedBook = await this.bookRepository.save({
      ...foundBook,
      ...{ ...updateBookDto, author: { ...author } },
    });

    return BookService.mapBookEntityToBookResponseDto(updatedBook);
  }

  async delete(bookId: number): Promise<void> {
    if (!bookId) {
      throw new HttpException(
        'Book id is not specified',
        HttpStatus.BAD_REQUEST,
      );
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    this.bookRepository.delete({ id: bookId });
  }
}
