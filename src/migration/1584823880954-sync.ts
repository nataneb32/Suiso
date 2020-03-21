import { MigrationInterface, QueryRunner } from 'typeorm'

export class sync1584823880954 implements MigrationInterface {
    name = 'sync1584823880954'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))', undefined)
      await queryRunner.query('CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "sellerId" integer)', undefined)
      await queryRunner.query('CREATE TABLE "temporary_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "sellerId" integer, CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)', undefined)
      await queryRunner.query('INSERT INTO "temporary_course"("id", "name", "price", "sellerId") SELECT "id", "name", "price", "sellerId" FROM "course"', undefined)
      await queryRunner.query('DROP TABLE "course"', undefined)
      await queryRunner.query('ALTER TABLE "temporary_course" RENAME TO "course"', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "course" RENAME TO "temporary_course"', undefined)
      await queryRunner.query('CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "sellerId" integer)', undefined)
      await queryRunner.query('INSERT INTO "course"("id", "name", "price", "sellerId") SELECT "id", "name", "price", "sellerId" FROM "temporary_course"', undefined)
      await queryRunner.query('DROP TABLE "temporary_course"', undefined)
      await queryRunner.query('DROP TABLE "course"', undefined)
      await queryRunner.query('DROP TABLE "user"', undefined)
    }
}
