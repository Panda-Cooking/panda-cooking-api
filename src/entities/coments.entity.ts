import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Recipe } from "./recipes.entity";
import { User } from "./users.entity";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.comments, {
        onDelete: "CASCADE",
    })
    recipe: Recipe;
}
