import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./categories.entity";
import { Comment } from "./coments.entity";
import { FavoriteRecipes } from "./favoriteRecipes.entity";
import { ImagesRecipes } from "./imagesRecipes.entity";
import { IngredientsRecipes } from "./ingredientsRecipes.entity";
import { Preparations } from "./preparations.entity";
import { User } from "./users.entity";

@Entity("recipes")
export class Recipe {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 150,
    })
    name: string;

    @Column({
        length: 500,
    })
    description: string;

    @Column({
        length: 15,
    })
    time: string;

    @Column({
        type: "integer",
    })
    portions: number;

    @ManyToOne(() => User, (user) => user.recipes)
    user: User;

    @ManyToOne(() => Category, (category) => category.recipes)
    category: Category;

    @OneToMany(() => ImagesRecipes, (imagesRecipes) => imagesRecipes.recipe)
    imagesRecipes: ImagesRecipes[];

    @OneToMany(
        () => IngredientsRecipes,
        (ingredientsRecipes) => ingredientsRecipes.recipe
    )
    ingredientsRecipes: IngredientsRecipes[];

    @OneToMany(() => Preparations, (preparations) => preparations.recipe)
    preparations: Preparations[];

    @OneToMany(() => Comment, (comment) => comment.recipe)
    comments: Comment[];

    @OneToMany(
        () => FavoriteRecipes,
        (favoriteRecipes) => favoriteRecipes.recipe
    )
    favoriteRecipe: FavoriteRecipes[];
}
