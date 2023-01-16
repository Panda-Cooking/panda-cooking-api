import { iCommentRequest } from "../../../interfaces/comments/commentsInterface";

export const mockedCommentCreation: iCommentRequest = {
    description: "descrição de teste",
    userId: "",
    recipeId: ""
};
export const mockedAdminCommentCreation: iCommentRequest = {
    description: "descrição de Admin",
    userId: "",
    recipeId: ""
};

export const mockedCommentCreationInvalidUserId: iCommentRequest = {
    description: "descrição de teste",
    userId: "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4",
    recipeId: ""
};

export const mockedCommentCreationInvalidRecipeId: iCommentRequest = {
    description: "descrição de teste",
    userId: "",
    recipeId: "b855d86b-d4c9-41cd-ab98-d7fa734c6ce4"
};
