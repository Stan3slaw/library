import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import type { BookResponseDto } from './dto/book.dto';
import { GetBooksQueryDto } from './dto/get-books-query.dto';

@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponseDto> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe())
    query: GetBooksQueryDto,
  ): Promise<BookResponseDto[]> {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) bookId: number,
  ): Promise<BookResponseDto> {
    return this.booksService.findOne(bookId);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    return this.booksService.update(bookId, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) bookId: number): Promise<void> {
    return this.booksService.delete(bookId);
  }
}
