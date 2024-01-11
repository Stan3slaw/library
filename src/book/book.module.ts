import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
