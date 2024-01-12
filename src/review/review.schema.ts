import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import type { Document } from 'mongoose';

import { MAX_RATING, MIN_RATING } from './constants';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Number })
  bookId: ObjectId;

  @Prop({ min: MIN_RATING, max: MAX_RATING })
  rating: number;

  @Prop()
  comment: string;
}

const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({});

export { ReviewSchema };
