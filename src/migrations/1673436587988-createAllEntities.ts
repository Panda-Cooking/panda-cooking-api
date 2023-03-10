import { MigrationInterface, QueryRunner } from "typeorm";

export class createAllEntities1673436587988 implements MigrationInterface {
    name = 'createAllEntities1673436587988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoriteRecipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "recipeId" uuid, CONSTRAINT "PK_2739dd9aceff149146decf20d6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "imageProfile" character varying(400), "isAdm" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "recipeId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredientsRecipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" character varying(50) NOT NULL, "recipeId" uuid, "ingredientsId" uuid, CONSTRAINT "PK_f9a34badee90efdc30b5379eda2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "preparations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(200) NOT NULL, "recipeId" uuid, CONSTRAINT "PK_b821aa801c36dc1176084d8ca10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "description" character varying(500) NOT NULL, "time" character varying(15) NOT NULL, "portions" integer NOT NULL, "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "imagesRecipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(400) NOT NULL, "recipeId" uuid, CONSTRAINT "PK_91c20e2594f0c8c82675851c731" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "FK_b2c9fe594993575a283bc4c48a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "FK_9fdd8981f75b592d7f4396ac819" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d2faca4b7c1a5875d6c997f7666" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preparations" ADD CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_d4097844785f4a027db682aa671" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "imagesRecipes" ADD CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagesRecipes" DROP CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_d4097844785f4a027db682aa671"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "preparations" DROP CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895"`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d2faca4b7c1a5875d6c997f7666"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" DROP CONSTRAINT "FK_9fdd8981f75b592d7f4396ac819"`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" DROP CONSTRAINT "FK_b2c9fe594993575a283bc4c48a6"`);
        await queryRunner.query(`DROP TABLE "imagesRecipes"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "preparations"`);
        await queryRunner.query(`DROP TABLE "ingredientsRecipes"`);
        await queryRunner.query(`DROP TABLE "ingredients"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favoriteRecipes"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
