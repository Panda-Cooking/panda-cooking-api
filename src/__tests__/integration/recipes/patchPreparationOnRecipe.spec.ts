import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import {
    mockedPreparationUpdateRequest,
    mockedRecipeRequest,
} from "../../mocks/recipes";
import { Category } from "../../../entities/categories.entity";

describe("Update preparations on recipe route tests", () => {
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

    test("PATCH /recipes/:id/preparations/:id - Should be able to update preparations on recipe", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const recipeId = responseAllRecipes.body[0].id;
        const preparationId = responseAllRecipes.body[0].preparations[0].id;

        const response = await request(app)
            .patch(`${baseUrl}/${recipeId}/preparations/${preparationId}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedPreparationUpdateRequest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("description");
    });

    test("PATCH /recipes/:id/preparations/:id - Should not be able to update preparations on recipe without authorization", async () => {
        const responseAllRecipes = await request(app).get(baseUrl).send();

        const recipeId = responseAllRecipes.body[0].id;
        const preparationId = responseAllRecipes.body[0].preparations[0].id;

        const response = await request(app)
            .patch(`${baseUrl}/${recipeId}/preparations/${preparationId}`)
            .send(mockedPreparationUpdateRequest);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    test("PATCH /recipes/:id/preparations/:id - Should not be able to update preparations on recipe with invalid recipeId", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const preparationId = responseAllRecipes.body[0].preparations[0].id;

        const response = await request(app)
            .patch(
                `${baseUrl}/324dab7d-aac1-4b90-b962-298bb6e95a91/preparations/${preparationId}`
            )
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedPreparationUpdateRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("PATCH /recipes/:id/preparations/:id - Should not be able to update preparations on recipe with invalid preparationId", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const recipeId = responseAllRecipes.body[0].id;

        const response = await request(app)
            .patch(
                `${baseUrl}/${recipeId}/preparations/324dab7d-aac1-4b90-b962-298bb6e95a91`
            )
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedPreparationUpdateRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});
