import {MigrationInterface, QueryRunner} from "typeorm";

export class NewCha1585330131462 implements MigrationInterface {
    name = 'NewCha1585330131462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, "thumbnailId" integer, CONSTRAINT "UQ_2067d5cbbe4bff83f11281ea5b1" UNIQUE ("thumbnailId"), CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course"("id", "name", "price", "description", "sellerId") SELECT "id", "name", "price", "description", "sellerId" FROM "course"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course" RENAME TO "course"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, "thumbnailId" integer, CONSTRAINT "UQ_2067d5cbbe4bff83f11281ea5b1" UNIQUE ("thumbnailId"), CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_71fce3f397edeeae4d27b78c460" FOREIGN KEY ("thumbnailId") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_course"("id", "name", "price", "description", "sellerId", "thumbnailId") SELECT "id", "name", "price", "description", "sellerId", "thumbnailId" FROM "course"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_course" RENAME TO "course"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" RENAME TO "temporary_course"`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, "thumbnailId" integer, CONSTRAINT "UQ_2067d5cbbe4bff83f11281ea5b1" UNIQUE ("thumbnailId"), CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "course"("id", "name", "price", "description", "sellerId", "thumbnailId") SELECT "id", "name", "price", "description", "sellerId", "thumbnailId" FROM "temporary_course"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" RENAME TO "temporary_course"`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "description" varchar, "sellerId" integer, CONSTRAINT "FK_ac834cfbec6a7de3ab8d08b99f9" FOREIGN KEY ("sellerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "course"("id", "name", "price", "description", "sellerId") SELECT "id", "name", "price", "description", "sellerId" FROM "temporary_course"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_course"`, undefined);
    }

}
