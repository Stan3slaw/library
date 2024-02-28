import { Field, Int, ObjectType } from '@nestjs/graphql';

import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field(() => DateScalar)
  createdAt: Date;

  @Field(() => DateScalar)
  updatedAt: Date;
}
