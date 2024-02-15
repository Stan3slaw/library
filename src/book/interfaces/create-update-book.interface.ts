import type { Author } from 'src/author/entities/author.entity';

export interface CreateUpdateBook {
  name: string;
  genre: string;
  description: string;
  number_of_pages: number;
  year: number;
}

export interface CreateUpdateBookWithAuthor extends CreateUpdateBook {
  author: Author;
}
