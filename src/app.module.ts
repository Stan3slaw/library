import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { BookModule } from './book/book.module';
import ormconfig from './config/configuration';
import { Book } from './book/entities/book.entity';
import { Author } from './author/entities/author.entity';
import { ReviewModule } from './review/review.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormconfig, entities: [Book, Author] }),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_DATABASE_NAME,
      auth: {
        username: process.env.MONGODB_USER_NAME,
        password: process.env.MONGODB_USER_PASSWORD,
      },
    }),
    BookModule,
    ReviewModule,
    AuthorModule,
  ],
})
export class AppModule {}
