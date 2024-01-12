import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import type { ReviewDocument } from './review.schema';
import { ParseObjectIdPipe } from './pipes/parse-object-id.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewDocument> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll(): Promise<ReviewDocument[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) reviewId: ObjectId,
  ): Promise<ReviewDocument> {
    return this.reviewService.findOne(reviewId);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseObjectIdPipe) reviewId: ObjectId,
  ): Promise<void> {
    return this.reviewService.delete(reviewId);
  }
}
