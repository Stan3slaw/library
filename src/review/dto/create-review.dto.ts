import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

import { MAX_RATING, MIN_RATING } from '../constants';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'Review bookId should be a number' })
  readonly bookId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Review rating should be a number' })
  @Min(MIN_RATING, {
    message: `Review rating should not be less than ${MIN_RATING}`,
  })
  @Max(MAX_RATING, {
    message: `Review rating should not be greater than ${MAX_RATING}`,
  })
  readonly rating: number;

  @IsNotEmpty()
  readonly comment: string;
}
