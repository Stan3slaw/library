import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAuthor {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  surname: string;
}

@ArgsType()
export class CreateBookArgs {
  @Field()
  name: string;

  @Field()
  genre: string;

  @Field()
  description: string;

  @Field(() => Int)
  year: number;

  @Field(() => Int)
  numberOfPages: number;

  @Field(() => CreateAuthor)
  author: CreateAuthor;
}
