import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { AuthorService } from './author.service';
import type { AuthorResponseDto } from './dto/author.dto';
import type { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './models/author.model';

@Resolver('Author')
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  async updateAuthor(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('surname') surname: string,
  ): Promise<AuthorResponseDto> {
    const updateAuthorDto: UpdateAuthorDto = {
      name,
      surname,
    };

    return this.authorService.update(id, updateAuthorDto);
  }
}
