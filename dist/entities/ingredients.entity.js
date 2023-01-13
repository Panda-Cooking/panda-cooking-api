"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredients = void 0;
const typeorm_1 = require("typeorm");
const ingredientsRecipes_entity_1 = require("./ingredientsRecipes.entity");
let Ingredients = class Ingredients {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Ingredients.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 60,
    }),
    __metadata("design:type", String)
], Ingredients.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ingredientsRecipes_entity_1.IngredientsRecipes, (ingredientsRecipes) => ingredientsRecipes.ingredients),
    __metadata("design:type", Array)
], Ingredients.prototype, "ingredientsRecipes", void 0);
Ingredients = __decorate([
    (0, typeorm_1.Entity)("ingredients")
], Ingredients);
exports.Ingredients = Ingredients;
