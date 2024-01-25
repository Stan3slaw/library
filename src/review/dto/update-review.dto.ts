import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';

import { CreateReviewDto } from './create-review.dto';

class UpdateReviewDtoWithoutBookId extends PartialType(
  OmitType(CreateReviewDto, ['bookId']),
) {}

class UpdateReviewDtoBookId extends PickType(CreateReviewDto, ['bookId']) {}

export class UpdateReviewDto extends IntersectionType(
  UpdateReviewDtoBookId,
  UpdateReviewDtoWithoutBookId,
) {}
