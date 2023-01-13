import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IngredientsRecipes } from "./ingredientsRecipes.entity";

@Entity("ingredients")
export class Ingredients {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 60,
    })
    name: string;

    @OneToMany(
        () => IngredientsRecipes,
        (ingredientsRecipes) => ingredientsRecipes.ingredients
    )
    ingredientsRecipes: IngredientsRecipes[];
}
