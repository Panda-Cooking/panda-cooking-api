import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipes.entity";

@Entity("imagesRecipes")
export class ImagesRecipes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 400,
    })
    url: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.imagesRecipes, {
        onDelete: "CASCADE",
    })
    recipe: Recipe;
}
