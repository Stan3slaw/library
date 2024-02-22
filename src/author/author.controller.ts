import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { AuthorService } from './author.service';
import type { AuthorResponseDto } from './dto/author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) authorId: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    return this.authorService.update(authorId, updateAuthorDto);
  }
}
