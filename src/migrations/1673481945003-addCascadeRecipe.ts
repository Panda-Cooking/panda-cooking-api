import { MigrationInterface, QueryRunner } from "typeorm";

export class addCascadeRecipe1673481945003 implements MigrationInterface {
    name = 'addCascadeRecipe1673481945003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagesRecipes" DROP CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9"`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36"`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
        await queryRunner.query(`ALTER TABLE "preparations" DROP CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895"`);
        await queryRunner.query(`ALTER TABLE "imagesRecipes" ADD CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preparations" ADD CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preparations" DROP CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895"`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36"`);
        await queryRunner.query(`ALTER TABLE "imagesRecipes" DROP CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9"`);
        await queryRunner.query(`ALTER TABLE "preparations" ADD CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "imagesRecipes" ADD CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
