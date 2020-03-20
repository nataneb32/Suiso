import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1584642444960 implements MigrationInterface {
    name = 'Initial1584642444960'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL)', undefined)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "user"', undefined)
    }
}
