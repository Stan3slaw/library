import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from 'src/book/entities/author.entity';
import type { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findOneOrCreate(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id: createAuthorDto?.id },
    });

    if (author) {
      return author;
    }

    const createdAuthor = await this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(author);

    return createdAuthor;
  }
}
