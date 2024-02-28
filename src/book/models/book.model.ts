import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Author } from 'src/author/models/author.model';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  genre: string;

  @Field()
  description: string;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => Int)
  year: number;

  @Field(() => DateScalar)
  createdAt: Date;

  @Field(() => DateScalar)
  updatedAt: Date;

  @Field(() => Author)
  author: Author;
}
