import { iUserResponse } from "../users";

export interface iCommentRecipeResponse {
    id: string;
    name: string;
    description: string;
    time: string;
    portions: number;
}

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
    user: iUserResponse;
    recipe: iCommentRecipeResponse;
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
    user: {
        id: string;
        name: string;
        email: string;
        imageProfile: string;
        isAdm: boolean;
    };
    recipe: {
        id: string;
        name: string;
        description: string;
        time: string;
        portions: number;
    };
}
