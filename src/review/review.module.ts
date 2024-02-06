import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/user.schema';
import { AuthorService } from 'src/author/author.service';
import { Book } from 'src/book/entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewSchema } from './review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Review', schema: ReviewSchema },
      { name: 'User', schema: UserSchema },
    ]),
    TypeOrmModule.forFeature([Book, Author]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, BookService, AuthorService, UserService],
})
export class ReviewModule {}
