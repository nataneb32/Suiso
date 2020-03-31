import {MigrationInterface, QueryRunner} from "typeorm";

export class init1585607027196 implements MigrationInterface {
    name = 'init1585607027196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`, undefined);
        await queryRunner.query(`CREATE TABLE "media" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" varchar NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "video" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mediaId" integer, "moduleId" integer, CONSTRAINT "REL_7e40e48cfd1d5c308208b9c675" UNIQUE ("mediaId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "courseId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, "thumbnailId" integer, CONSTRAINT "REL_71fce3f397edeeae4d27b78c46" UNIQUE ("thumbnailId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_video" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mediaId" integer, "moduleId" integer, CONSTRAINT "REL_7e40e48cfd1d5c308208b9c675" UNIQUE ("mediaId"), CONSTRAINT "FK_7e40e48cfd1d5c308208b9c6752" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2ac6e2f862b9572910a4480b8dc" FOREIGN KEY ("moduleId") REFERENCES "course_module" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_video"("id", "title", "description", "mediaId", "moduleId") SELECT "id", "title", "description", "mediaId", "moduleId" FROM "video"`, undefined);
        await queryRunner.query(`DROP TABLE "video"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_video" RENAME TO "video"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "courseId" integer, CONSTRAINT "FK_e27b3a3cf92fd9b32f152a4f7fc" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course_module"("id", "title", "description", "courseId") SELECT "id", "title", "description", "courseId" FROM "course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "course_module"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course_module" RENAME TO "course_module"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, "thumbnailId" integer, CONSTRAINT "REL_71fce3f397edeeae4d27b78c46" UNIQUE ("thumbnailId"), CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_71fce3f397edeeae4d27b78c460" FOREIGN KEY ("thumbnailId") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course"("id", "name", "price", "description", "sellerId", "thumbnailId") SELECT "id", "name", "price", "description", "sellerId", "thumbnailId" FROM "course"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course" RENAME TO "course"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" RENAME TO "temporary_course"`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, "thumbnailId" integer, CONSTRAINT "REL_71fce3f397edeeae4d27b78c46" UNIQUE ("thumbnailId"))`, undefined);
        await queryRunner.query(`INSERT INTO "course"("id", "name", "price", "description", "sellerId", "thumbnailId") SELECT "id", "name", "price", "description", "sellerId", "thumbnailId" FROM "temporary_course"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_module" RENAME TO "temporary_course_module"`, undefined);
        await queryRunner.query(`CREATE TABLE "course_module" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "courseId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "course_module"("id", "title", "description", "courseId") SELECT "id", "title", "description", "courseId" FROM "temporary_course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course_module"`, undefined);
        await queryRunner.query(`ALTER TABLE "video" RENAME TO "temporary_video"`, undefined);
        await queryRunner.query(`CREATE TABLE "video" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "mediaId" integer, "moduleId" integer, CONSTRAINT "REL_7e40e48cfd1d5c308208b9c675" UNIQUE ("mediaId"))`, undefined);
        await queryRunner.query(`INSERT INTO "video"("id", "title", "description", "mediaId", "moduleId") SELECT "id", "title", "description", "mediaId", "moduleId" FROM "temporary_video"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_video"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`DROP TABLE "course_module"`, undefined);
        await queryRunner.query(`DROP TABLE "video"`, undefined);
        await queryRunner.query(`DROP TABLE "media"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
