import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModule } from 'src/author/author.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { BookRepository } from './book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author]), AuthorModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BookModule {}
