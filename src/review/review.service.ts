import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { ObjectId } from 'mongoose';

import { BookService } from 'src/book/book.service';
import type { ReviewDocument } from './review.schema';
import type { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
    private readonly bookService: BookService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const book = await this.bookService.findOne(createReviewDto.bookId);

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    const review = new this.reviewModel(createReviewDto);
    const savedReview = await review.save();

    return savedReview;
  }

  async findAll(): Promise<ReviewDocument[]> {
    const reviews = await this.reviewModel.find();

    return reviews;
  }

  async findOne(reviewId: ObjectId): Promise<ReviewDocument> {
    const review = await this.reviewModel.findById(reviewId);

    if (!review) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }

    return review;
  }

  async delete(reviewId: ObjectId): Promise<void> {
    const review = await this.reviewModel.findOne(reviewId);

    if (!review) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }

    await review.deleteOne();
  }
}
