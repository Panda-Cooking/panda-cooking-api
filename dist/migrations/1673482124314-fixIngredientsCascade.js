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
exports.fixIngredientsCascade1673482124314 = void 0;
class fixIngredientsCascade1673482124314 {
    constructor() {
        this.name = 'fixIngredientsCascade1673482124314';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" DROP CONSTRAINT "FK_001757a1fcc49d1503eebd92119"`);
            yield queryRunner.query(`ALTER TABLE "ingredientsRecipes" ADD CONSTRAINT "FK_001757a1fcc49d1503eebd92119" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
}
exports.fixIngredientsCascade1673482124314 = fixIngredientsCascade1673482124314;
