import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateAuthorArgs {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;
}
