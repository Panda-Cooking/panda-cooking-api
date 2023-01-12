import { iRecipeRequest } from "../recipes/recipesInterface";
import { iUserResponse } from "../users";

export interface iCommentRequest {
    description: string;
    userId: string;
    recipeId: string;
}

export interface iCommentResponse {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface iComment {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    recipeId: string;
}
export interface iCommentUpdated {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: iUserResponse;
    recipeId: iRecipeRequest;
}
