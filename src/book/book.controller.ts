import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { BookService } from './book.service';
import type { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) bookId: number): Promise<Book> {
    return this.booksService.findOne(bookId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(bookId, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) bookId: number): Promise<void> {
    return this.booksService.delete(bookId);
  }
}
