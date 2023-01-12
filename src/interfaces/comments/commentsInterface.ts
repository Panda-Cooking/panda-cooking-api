import { iUserResponse } from "../users";

export interface iCommentRequest {
    description : string
    userId: string;
    recipeId: string;
  }

export interface iCommentReturn {
  description: string
  user: iUserResponse
  recipe: object
}
  
  export interface iComment {
    id: string
    description: string
    createdAt: Date
    updatedAt: Date
    userId: string
    recipeId: string
  }