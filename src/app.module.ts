import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BookModule } from './book/book.module';
import ormconfig from './config/configuration';
import { Book } from './book/entities/book.entity';
import { Author } from './book/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormconfig, entities: [Book, Author] }),
    BookModule,
  ],
})
export class AppModule {}
