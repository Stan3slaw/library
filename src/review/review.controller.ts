import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import type { ReviewDocument } from './review.schema';
import { ParseObjectIdPipe } from './pipes/parse-object-id.pipe';
import { UpdateReviewDto } from './dto/update-review.dto';

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
  async findAllForParticularBook(
    @Query('bookId', ParseIntPipe) bookId: number,
  ): Promise<ReviewDocument[]> {
    return this.reviewService.findAllForParticularBook(bookId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) reviewId: ObjectId,
    @Query('bookId', ParseIntPipe) bookId: number,
  ): Promise<ReviewDocument> {
    return this.reviewService.findOneForParticularBook(reviewId, bookId);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) reviewId: ObjectId,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewDocument> {
    return this.reviewService.update(reviewId, updateReviewDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseObjectIdPipe) reviewId: ObjectId,
  ): Promise<void> {
    return this.reviewService.delete(reviewId);
  }
}
