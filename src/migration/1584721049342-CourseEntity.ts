import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseEntity1584721049342 implements MigrationInterface {
    name = 'CourseEntity1584721049342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "course_entity"`, undefined);
    }

}
