import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import type { Author } from 'src/author/entities/author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';
import type { UpdateAuthorDto } from './dto/update-author.dto';
import type { AuthorResponseDto } from './dto/author.dto';
import { AuthorRepository } from './author.repository';
import type { CreateUpdateAuthor } from './interfaces/create-update-author.interface';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  private static mapAuthorEntityToAuthorResponseDto(
    authorEntity: Author,
  ): AuthorResponseDto {
    return {
      id: authorEntity.id,
      name: authorEntity.name,
      surname: authorEntity.surname,
    };
  }

  private static mapCreateAuthorDtoToAuthorEntity(
    createAuthorDto: CreateAuthorDto,
  ): CreateUpdateAuthor {
    return {
      name: createAuthorDto.name,
      surname: createAuthorDto.surname,
    };
  }

  private static mapUpdateAuthorDtoToAuthorEntity(
    author: Author,
    updateAuthorDto: UpdateAuthorDto,
  ): CreateUpdateAuthor {
    return {
      name: updateAuthorDto.name ?? author.name,
      surname: updateAuthorDto.surname ?? author.surname,
    };
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const createdAuthor = this.authorRepository.create(
      AuthorService.mapCreateAuthorDtoToAuthorEntity(createAuthorDto),
    );

    return createdAuthor;
  }

  async findOne(authorId: number): Promise<Author> {
    if (!authorId) {
      throw new HttpException(
        'Author id is not specified',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundAuthor = await this.authorRepository.findOne(authorId);

    if (!foundAuthor) {
      throw new HttpException('Author does not exist', HttpStatus.NOT_FOUND);
    }

    return foundAuthor;
  }

  async update(
    authorId: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const foundAuthor = await this.findOne(authorId);

    const updatedAuthor = await this.authorRepository.update({
      ...foundAuthor,
      ...AuthorService.mapUpdateAuthorDtoToAuthorEntity(
        foundAuthor,
        updateAuthorDto,
      ),
    });

    return AuthorService.mapAuthorEntityToAuthorResponseDto(updatedAuthor);
  }
}
