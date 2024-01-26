import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Author } from '../../author/entities/author.entity';
import {
  MAX_BOOK_GENRE_CHARACTERS,
  MAX_BOOK_NAME_CHARACTERS,
} from '../constants';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: MAX_BOOK_NAME_CHARACTERS })
  name: string;

  @Column({ length: MAX_BOOK_GENRE_CHARACTERS })
  genre: string;

  @Column('text')
  description: string;

  @Column()
  number_of_pages: number;

  @Column()
  year: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updated_at: Date;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
