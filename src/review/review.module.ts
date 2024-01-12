import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookModule } from 'src/book/book.module';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/entities/book.entity';
import { Author } from 'src/book/entities/author.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewSchema } from './review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
    TypeOrmModule.forFeature([Book, Author]),
    BookModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, BookService],
})
export class ReviewModule {}
