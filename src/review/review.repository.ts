import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { ObjectId } from 'mongoose';

import type { ReviewDocument } from './review.schema';
import type { CreateReviewDto } from './dto/create-review.dto';
import type { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const review = new this.reviewModel(createReviewDto);
    const savedReview = await review.save();

    return savedReview;
  }

  async findAllForParticularBook(bookId: number): Promise<ReviewDocument[]> {
    const reviews = await this.reviewModel.find({ bookId });

    return reviews;
  }

  async findOne(reviewId: ObjectId): Promise<ReviewDocument> {
    const [review] = await this.reviewModel.find({
      _id: reviewId,
    });

    return review;
  }

  async update(
    reviewId: ObjectId,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    const updatedReview = await this.reviewModel.findOneAndUpdate(
      { _id: reviewId },
      updateReviewDto,
      { new: true },
    );

    return updatedReview;
  }
}
