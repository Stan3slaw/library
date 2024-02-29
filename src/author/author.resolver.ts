import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthorService } from './author.service';
import type { AuthorResponseDto } from './dto/author.dto';
import { Author } from './models/author.model';
import { UpdateAuthorArgs } from './args/update-author.args';

@Resolver('Author')
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  async updateAuthor(
    @Args() updateAuthorArgs: UpdateAuthorArgs,
  ): Promise<AuthorResponseDto> {
    const { id, ...updateAuthorDto } = updateAuthorArgs;

    return this.authorService.update(id, updateAuthorDto);
  }
}
