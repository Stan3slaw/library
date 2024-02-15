import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Author } from 'src/author/entities/author.entity';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}
