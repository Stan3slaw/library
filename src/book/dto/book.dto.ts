import type { AuthorResponseDto } from 'src/author/dto/author.dto';

export interface BookResponseDto {
  id: number;
  name: string;
  genre: string;
  description: string;
  numberOfPages: number;
  year: number;
  createdAt: Date;
  updatedAt: Date;
  author: AuthorResponseDto;
}
