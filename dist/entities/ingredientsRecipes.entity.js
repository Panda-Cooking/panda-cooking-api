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
exports.IngredientsRecipes = void 0;
const typeorm_1 = require("typeorm");
const ingredients_entity_1 = require("./ingredients.entity");
const recipes_entity_1 = require("./recipes.entity");
let IngredientsRecipes = class IngredientsRecipes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], IngredientsRecipes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], IngredientsRecipes.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipes_entity_1.Recipe, (recipe) => recipe.ingredientsRecipes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", recipes_entity_1.Recipe)
], IngredientsRecipes.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ingredients_entity_1.Ingredients, (ingredients) => ingredients.ingredientsRecipes),
    __metadata("design:type", ingredients_entity_1.Ingredients)
], IngredientsRecipes.prototype, "ingredients", void 0);
IngredientsRecipes = __decorate([
    (0, typeorm_1.Entity)("ingredientsRecipes")
], IngredientsRecipes);
exports.IngredientsRecipes = IngredientsRecipes;
