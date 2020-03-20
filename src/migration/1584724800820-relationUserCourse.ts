import {MigrationInterface, QueryRunner} from "typeorm";

export class relationUserCourse1584724800820 implements MigrationInterface {
    name = 'relationUserCourse1584724800820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "sellerId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course"("id", "name", "price") SELECT "id", "name", "price" FROM "course"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course" RENAME TO "course"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "sellerId" integer, CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course"("id", "name", "price", "sellerId") SELECT "id", "name", "price", "sellerId" FROM "course"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course" RENAME TO "course"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" RENAME TO "temporary_course"`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "sellerId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "course"("id", "name", "price", "sellerId") SELECT "id", "name", "price", "sellerId" FROM "temporary_course"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" RENAME TO "temporary_course"`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "course"("id", "name", "price") SELECT "id", "name", "price" FROM "temporary_course"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course"`, undefined);
    }

}
