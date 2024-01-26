import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from 'src/author/entities/author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const createdAuthor = this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(createdAuthor);

    return createdAuthor;
  }

  async findOne(authorId: number): Promise<Author> {
    const foundAuthor = await this.authorRepository.findOneBy({ id: authorId });

    if (!foundAuthor) {
      throw new HttpException('Author does not exist', HttpStatus.NOT_FOUND);
    }

    return foundAuthor;
  }
}
