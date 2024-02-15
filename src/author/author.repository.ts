import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Author } from './entities/author.entity';
import type { CreateUpdateAuthor } from './interfaces/create-update-author.interface';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthor: CreateUpdateAuthor): Promise<Author> {
    const createdAuthor = this.authorRepository.create(createAuthor);
    await this.authorRepository.save(createdAuthor);

    return createdAuthor;
  }

  async findOne(authorId: number): Promise<Author> {
    const foundAuthor = await this.authorRepository.findOneBy({ id: authorId });

    return foundAuthor;
  }

  async update(author: Author): Promise<Author> {
    const updatedAuthor = await this.authorRepository.save(author);

    return updatedAuthor;
  }
}
