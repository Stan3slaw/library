import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { ObjectId } from 'mongoose';

import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';
import type { ReviewDocument } from './review.schema';
import type { CreateReviewDto } from './dto/create-review.dto';
import type { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const book = await this.bookService.findOne(createReviewDto.bookId);

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.findOne(createReviewDto.userId);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const createdReview = await this.reviewRepository.create(createReviewDto);

    return createdReview;
  }

  async findAllForParticularBook(bookId: number): Promise<ReviewDocument[]> {
    const reviews = await this.reviewRepository.findAllForParticularBook(
      bookId,
    );

    return reviews;
  }

  async findOne(reviewId: ObjectId): Promise<ReviewDocument> {
    const foundReview = await this.reviewRepository.findOne(reviewId);

    if (!foundReview) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }

    return foundReview;
  }

  async update(
    reviewId: ObjectId,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    const book = await this.bookService.findOne(updateReviewDto.bookId);

    if (!book) {
      throw new HttpException('Book does not exist', HttpStatus.NOT_FOUND);
    }

    const updatedReview = await this.reviewRepository.update(
      reviewId,
      updateReviewDto,
    );

    return updatedReview;
  }

  async delete(reviewId: ObjectId): Promise<void> {
    const review = await this.reviewRepository.findOne(reviewId);

    if (!review) {
      throw new HttpException('Review does not exist', HttpStatus.NOT_FOUND);
    }

    await review.deleteOne();
  }
}
