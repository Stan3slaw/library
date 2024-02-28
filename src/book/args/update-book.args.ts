import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateBookArgs {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  genre: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Int, { nullable: true })
  year: number;

  @Field(() => Int, { nullable: true })
  numberOfPages: number;
}
