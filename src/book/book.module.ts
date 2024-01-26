import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorService } from 'src/author/author.service';
import { AuthorModule } from 'src/author/author.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author]), AuthorModule],
  providers: [BookService, AuthorService],
  controllers: [BookController],
})
export class BookModule {}
