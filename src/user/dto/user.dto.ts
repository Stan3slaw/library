import type { Review } from 'src/review/review.schema';

export interface UserWithReviews {
  _id: string;
  name: string;
  surname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
}
