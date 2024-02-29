import { ArgsType, Field } from '@nestjs/graphql';

import { DateScalar } from 'src/common/scalars/date.scalar';

@ArgsType()
export class GetBooksArgs {
  @Field(() => DateScalar, { nullable: true })
  fromTime?: Date;

  @Field(() => DateScalar, { nullable: true })
  toTime?: Date;
}
