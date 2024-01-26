import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from 'src/book/entities/author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';
import type { AuthorResponseDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  private static mapAuthorEntityToAuthorResponseDto(
    authorEntity: Author,
  ): AuthorResponseDto {
    return {
      id: authorEntity.id,
      name: authorEntity.name,
      surname: authorEntity.surname,
      createdAt: authorEntity.created_at,
      updatedAt: authorEntity.updated_at,
    };
  }

  async findOneOrCreate(
    createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findOne({
      where: { id: createAuthorDto?.id },
    });

    if (author) {
      return AuthorService.mapAuthorEntityToAuthorResponseDto(author);
    }

    const createdAuthor = await this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(author);

    return AuthorService.mapAuthorEntityToAuthorResponseDto(createdAuthor);
  }
}
