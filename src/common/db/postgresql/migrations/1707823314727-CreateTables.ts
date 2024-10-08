import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1707823314727 implements MigrationInterface {
  name = 'CreateTables1707823314727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "authors" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" varchar(60) NOT NULL,
        "surname" varchar(60) NOT NULL,
        "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "books" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" varchar(60) NOT NULL,
        "genre" varchar(40) NOT NULL,
        "description" TEXT NOT NULL,
        "number_of_pages" INT NOT NULL,
        "year" INT NOT NULL,
        "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "author_id" integer REFERENCES authors(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "books"');
    await queryRunner.query('DROP TABLE IF EXISTS "authors"');
  }
}
