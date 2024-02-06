import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ObjectId } from 'mongoose';

import { IsMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';
import { MAX_RATING, MIN_RATING } from '../constants';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'review bookId should be a number' })
  readonly bookId: number;

  @IsNotEmpty()
  @IsMongoObjectId()
  readonly userId: ObjectId;

  @IsNotEmpty()
  @IsNumber({}, { message: 'review rating should be a number' })
  @Min(MIN_RATING, {
    message: `review rating should not be less than ${MIN_RATING}`,
  })
  @Max(MAX_RATING, {
    message: `review rating should not be greater than ${MAX_RATING}`,
  })
  readonly rating: number;

  @IsString({ message: 'review comment should be a string' })
  @IsNotEmpty()
  readonly comment: string;
}
