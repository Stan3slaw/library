import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveLanguageColumnFromBooks1707826262300
  implements MigrationInterface
{
  name = 'RemoveLanguageColumnFromBooks1707826262300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey"`,
    );
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "language"`);
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "created_at" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "updated_at" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "updated_at" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "created_at" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "updated_at" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "updated_at" SET DEFAULT ('now'::text)::timestamp(3) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_1056dbee4616479f7d562c562df" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_1056dbee4616479f7d562c562df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "updated_at" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ALTER COLUMN "created_at" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "updated_at" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "authors" ALTER COLUMN "created_at" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD "language" character varying NOT NULL DEFAULT 'english'`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
