export interface ifavoriteRecipesResponse {
    recipe: {
        id: string;
        name: string;
        description: string;
        time: string;
        portions: number;
    };
}
