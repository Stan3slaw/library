import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModule } from 'src/author/author.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { BookRepository } from './book.repository';
import { BookResolver } from './book.resolver';
import { DateScalar } from '../common/scalars/date.scalar';
import { PubSubModule } from '../common/pubsub/pubsub.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author]),
    AuthorModule,
    PubSubModule,
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository, BookResolver, DateScalar],
  exports: [BookService],
})
export class BookModule {}
