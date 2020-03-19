import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserUsernameUnique1584652268829 implements MigrationInterface {
    name = 'UserUsernameUnique1584652268829'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL)', undefined)
      await queryRunner.query('INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"', undefined)
      await queryRunner.query('DROP TABLE "user"', undefined)
      await queryRunner.query('ALTER TABLE "temporary_user" RENAME TO "user"', undefined)
      await queryRunner.query('CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_3021ae0235cf9c4a6d59663f859" UNIQUE ("username"))', undefined)
      await queryRunner.query('INSERT INTO "temporary_user"("id", "username", "password") SELECT "id", "username", "password" FROM "user"', undefined)
      await queryRunner.query('DROP TABLE "user"', undefined)
      await queryRunner.query('ALTER TABLE "temporary_user" RENAME TO "user"', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" RENAME TO "temporary_user"', undefined)
      await queryRunner.query('CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL)', undefined)
      await queryRunner.query('INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"', undefined)
      await queryRunner.query('DROP TABLE "temporary_user"', undefined)
      await queryRunner.query('ALTER TABLE "user" RENAME TO "temporary_user"', undefined)
      await queryRunner.query('CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL)', undefined)
      await queryRunner.query('INSERT INTO "user"("id", "username", "password") SELECT "id", "username", "password" FROM "temporary_user"', undefined)
      await queryRunner.query('DROP TABLE "temporary_user"', undefined)
    }
}
