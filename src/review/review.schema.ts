import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';
import { Types, ObjectId } from 'mongoose';

import { MAX_RATING, MIN_RATING } from './constants';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: Number })
  bookId: number;

  @Prop({ type: Number, min: MIN_RATING, max: MAX_RATING })
  rating: number;

  @Prop()
  comment: string;
}

const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({});

export { ReviewSchema };
