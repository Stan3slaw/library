import { Body, Controller, Get, Post } from '@nestjs/common';

import { BookService } from './book.service';
import type { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
