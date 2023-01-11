import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./recipes.entity";

@Entity("preparations")
export class Preparations {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 200,
    })
    description: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.preparations)
    recipe: Recipe;
}
