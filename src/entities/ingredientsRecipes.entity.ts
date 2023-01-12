import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredients } from "./ingredients.entity";
import { Recipe } from "./recipes.entity";

@Entity("ingredientsRecipes")
export class IngredientsRecipes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 50,
    })
    amount: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredientsRecipes, {
        onDelete: "CASCADE",
    })
    recipe: Recipe;

    @ManyToOne(
        () => Ingredients,
        (ingredients) => ingredients.ingredientsRecipes
    )
    ingredients: Ingredients;
}
