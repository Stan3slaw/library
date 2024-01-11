import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Book } from './book.entity';
import {
  MAX_AUTHOR_NAME_CHARACTERS,
  MAX_AUTHOR_SURNAME_CHARACTERS,
} from '../constants';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: MAX_AUTHOR_NAME_CHARACTERS })
  name: string;

  @Column({ length: MAX_AUTHOR_SURNAME_CHARACTERS })
  surname: string;

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

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
