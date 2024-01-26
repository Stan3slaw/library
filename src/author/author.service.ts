import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from 'src/author/entities/author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';
import type { UpdateAuthorDto } from './dto/update-author.dto';
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
    };
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const createdAuthor = this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(createdAuthor);

    return createdAuthor;
  }

  async findOne(authorId: number): Promise<Author> {
    if (!authorId) {
      throw new HttpException(
        'Author id is not specified',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundAuthor = await this.authorRepository.findOneBy({ id: authorId });

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

    const updatedAuthor = await this.authorRepository.save({
      ...foundAuthor,
      ...updateAuthorDto,
    });

    return AuthorService.mapAuthorEntityToAuthorResponseDto(updatedAuthor);
  }
}
