import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDeleteOnCascade1674080761786 implements MigrationInterface {
    name = 'fixDeleteOnCascade1674080761786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" DROP CONSTRAINT "FK_b2c9fe594993575a283bc4c48a6"`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" DROP CONSTRAINT "FK_9fdd8981f75b592d7f4396ac819"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d2faca4b7c1a5875d6c997f7666"`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "FK_b2c9fe594993575a283bc4c48a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "FK_9fdd8981f75b592d7f4396ac819" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d2faca4b7c1a5875d6c997f7666" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_d2faca4b7c1a5875d6c997f7666"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" DROP CONSTRAINT "FK_9fdd8981f75b592d7f4396ac819"`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" DROP CONSTRAINT "FK_b2c9fe594993575a283bc4c48a6"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_d2faca4b7c1a5875d6c997f7666" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "FK_9fdd8981f75b592d7f4396ac819" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteRecipes" ADD CONSTRAINT "FK_b2c9fe594993575a283bc4c48a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
