import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserSchema } from 'src/user/user.schema';
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
    UserModule,
    AuthorModule,
    BookModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
