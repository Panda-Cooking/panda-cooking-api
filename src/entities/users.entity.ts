import { hashSync } from "bcryptjs";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany,
} from "typeorm";
import { Comment } from "./coments.entity";
import { FavoriteRecipes } from "./favoriteRecipes.entity";
import { Recipe } from "./recipes.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 120,
    })
    name: string;

    @Column({
        length: 120,
        unique: true,
    })
    email: string;

    @Column({
        length: 120,
    })
    password: string;

    @Column({
        length: 400,
        nullable: true,
    })
    imageProfile: string;

    @Column({
        type: "boolean",
        default: false,
    })
    isAdm: boolean;

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => FavoriteRecipes, (favoriteRecipes) => favoriteRecipes.user)
    favoriteRecipes: FavoriteRecipes[];

    @BeforeInsert()
    hashPassword() {
        if (this.password) {
            this.password = hashSync(this.password, 10);
        }
    }
}
