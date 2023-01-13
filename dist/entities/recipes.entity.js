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
exports.Recipe = void 0;
const typeorm_1 = require("typeorm");
const categories_entity_1 = require("./categories.entity");
const coments_entity_1 = require("./coments.entity");
const favoriteRecipes_entity_1 = require("./favoriteRecipes.entity");
const imagesRecipes_entity_1 = require("./imagesRecipes.entity");
const ingredientsRecipes_entity_1 = require("./ingredientsRecipes.entity");
const preparations_entity_1 = require("./preparations.entity");
const users_entity_1 = require("./users.entity");
let Recipe = class Recipe {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Recipe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 150,
    }),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500,
    }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 15,
    }),
    __metadata("design:type", String)
], Recipe.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
    }),
    __metadata("design:type", Number)
], Recipe.prototype, "portions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.recipes),
    __metadata("design:type", users_entity_1.User)
], Recipe.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Category, (category) => category.recipes),
    __metadata("design:type", categories_entity_1.Category)
], Recipe.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imagesRecipes_entity_1.ImagesRecipes, (imagesRecipes) => imagesRecipes.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "imagesRecipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ingredientsRecipes_entity_1.IngredientsRecipes, (ingredientsRecipes) => ingredientsRecipes.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredientsRecipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preparations_entity_1.Preparations, (preparations) => preparations.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "preparations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coments_entity_1.Comment, (comment) => comment.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favoriteRecipes_entity_1.FavoriteRecipes, (favoriteRecipes) => favoriteRecipes.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "favoriteRecipe", void 0);
Recipe = __decorate([
    (0, typeorm_1.Entity)("recipes")
], Recipe);
exports.Recipe = Recipe;
