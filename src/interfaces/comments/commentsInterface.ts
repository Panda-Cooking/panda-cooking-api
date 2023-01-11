export interface iCommentRequest {
  description : string
}

export interface iComment {
  id: string
  description: string
  createdAt: Date
  updatedAt: Date
  userId: string
  recipeId: string
}
