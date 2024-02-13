import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLanguageColumnToBooks1707824775053
  implements MigrationInterface
{
  name = 'AddLanguageColumnToBooks1707824775053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" ADD "language" character varying NOT NULL DEFAULT 'english'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "language"`);
  }
}
