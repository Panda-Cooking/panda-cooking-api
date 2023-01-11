export interface iCommentRequest {
    description : string
    userId: string;
    recipeId: string;
  }
  
  export interface iComment {
    id: string
    description: string
    createdAt: Date
    updatedAt: Date
    userId: string
    recipeId: string
  }