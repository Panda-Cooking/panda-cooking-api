"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCascadeRecipe1673481945003 = void 0;
class addCascadeRecipe1673481945003 {
    constructor() {
        this.name = 'addCascadeRecipe1673481945003';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "imagesRecipes" DROP CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9"`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36"`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
            yield queryRunner.query(`ALTER TABLE "preparations" DROP CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895"`);
            yield queryRunner.query(`ALTER TABLE "imagesRecipes" ADD CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "preparations" ADD CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "preparations" DROP CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895"`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36"`);
            yield queryRunner.query(`ALTER TABLE "imagesRecipes" DROP CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9"`);
            yield queryRunner.query(`ALTER TABLE "preparations" ADD CONSTRAINT "FK_ac3f675b2f75d2e5e1703b19895" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_8ed22f8729b2109bc291fb10a36" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "imagesRecipes" ADD CONSTRAINT "FK_f63ab290b1a0758460fa0b263e9" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.addCascadeRecipe1673481945003 = addCascadeRecipe1673481945003;
