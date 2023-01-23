import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipes.entity";
import { User } from "./users.entity";

@Entity("favoriteRecipes")
export class FavoriteRecipes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.favoriteRecipes, {
        onDelete: "CASCADE",
    })
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.favoriteRecipe, {
        onDelete: "CASCADE",
    })
    recipe: Recipe;
}
