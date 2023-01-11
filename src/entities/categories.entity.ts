import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Recipe } from "./recipes.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 120,
        unique: true,
    })
    name: string;

    @OneToMany(() => Recipe, (recipe) => recipe.category)
    recipes: Recipe[];
}
