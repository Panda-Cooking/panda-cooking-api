import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import {
    mockedImagesRecipesUpdateRequest,
    mockedRecipeRequest,
} from "../../mocks/recipes";
import { Category } from "../../../entities/categories.entity";

describe("Delete ingredients on recipe route tests", () => {
    let conn: DataSource;
    const baseUrl = "/recipes";

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (conn = res))
            .catch((err) => console.log(err));

        const categoryRepo = AppDataSource.getRepository(Category);
        await categoryRepo.save({
            name: "lanches",
        });
        await request(app).post("/users").send(mockedUserRequest);
    });

    afterAll(async () => {
        await conn.destroy();
    });

    test("DELETE /recipes/:id/ingredients/:id - Should be able to delete ingredient on recipe", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const recipeId = responseAllRecipes.body[0].id;
        const ingredientId =
            responseAllRecipes.body[0].ingredientsRecipes[0].ingredients.id;

        const response = await request(app)
            .delete(`${baseUrl}/${recipeId}/ingredients/${ingredientId}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedImagesRecipesUpdateRequest);

        expect(response.status).toBe(204);
    });

    test("DELETE /recipes/:id/ingredients/:id - Should not be able to delete ingredient on recipe without authorization", async () => {
        const responseAllRecipes = await request(app).get(baseUrl).send();

        const recipeId = responseAllRecipes.body[0].id;
        const ingredientId =
            responseAllRecipes.body[0].ingredientsRecipes[0].ingredients.id;

        const response = await request(app)
            .delete(`${baseUrl}/${recipeId}/ingredients/${ingredientId}`)
            .send(mockedImagesRecipesUpdateRequest);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /recipes/:id/ingredients/:id - Should not be able to delete ingredient on recipe with invalid recipeId", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const ingredientId =
            responseAllRecipes.body[0].ingredientsRecipes[0].ingredients.id;

        const response = await request(app)
            .delete(
                `${baseUrl}/324dab7d-aac1-4b90-b962-298bb6e95a91/ingredients/${ingredientId}`
            )
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedImagesRecipesUpdateRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /recipes/:id/ingredients/:id - Should not be able to delete ingredient on recipe with invalid ingredientId", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const recipeId = responseAllRecipes.body[0].id;

        const response = await request(app)
            .delete(
                `${baseUrl}/${recipeId}/ingredients/324dab7d-aac1-4b90-b962-298bb6e95a91`
            )
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedImagesRecipesUpdateRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});
