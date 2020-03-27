import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseSchema1585311024127 implements MigrationInterface {
    name = 'CourseSchema1585311024127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mediaId" integer, "moduleId" integer, CONSTRAINT "REL_7e40e48cfd1d5c308208b9c675" UNIQUE ("mediaId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "courseId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course_module"("id", "title", "description") SELECT "id", "title", "description" FROM "course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "course_module"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course_module" RENAME TO "course_module"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_video" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mediaId" integer, "moduleId" integer, CONSTRAINT "REL_7e40e48cfd1d5c308208b9c675" UNIQUE ("mediaId"), CONSTRAINT "FK_7e40e48cfd1d5c308208b9c6752" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2ac6e2f862b9572910a4480b8dc" FOREIGN KEY ("moduleId") REFERENCES "course_module" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_video"("id", "title", "description", "mediaId", "moduleId") SELECT "id", "title", "description", "mediaId", "moduleId" FROM "video"`, undefined);
        await queryRunner.query(`DROP TABLE "video"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_video" RENAME TO "video"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "courseId" integer, CONSTRAINT "FK_e27b3a3cf92fd9b32f152a4f7fc" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course_module"("id", "title", "description", "courseId") SELECT "id", "title", "description", "courseId" FROM "course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "course_module"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course_module" RENAME TO "course_module"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_module" RENAME TO "temporary_course_module"`, undefined);
        await queryRunner.query(`CREATE TABLE "course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "courseId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "course_module"("id", "title", "description", "courseId") SELECT "id", "title", "description", "courseId" FROM "temporary_course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course_module"`, undefined);
        await queryRunner.query(`ALTER TABLE "video" RENAME TO "temporary_video"`, undefined);
        await queryRunner.query(`CREATE TABLE "video" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mediaId" integer, "moduleId" integer, CONSTRAINT "REL_7e40e48cfd1d5c308208b9c675" UNIQUE ("mediaId"))`, undefined);
        await queryRunner.query(`INSERT INTO "video"("id", "title", "description", "mediaId", "moduleId") SELECT "id", "title", "description", "mediaId", "moduleId" FROM "temporary_video"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_video"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_module" RENAME TO "temporary_course_module"`, undefined);
        await queryRunner.query(`CREATE TABLE "course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "course_module"("id", "title", "description") SELECT "id", "title", "description" FROM "temporary_course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "video"`, undefined);
    }

}
