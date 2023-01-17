import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import {
    mockedImagesRecipesRequest,
    mockedRecipeRequest,
} from "../../mocks/recipes";
import { Category } from "../../../entities/categories.entity";

describe("Add images on recipe route tests", () => {
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

    test("POST /recipes/:id/imagesrecipes - Should be able to add image on recipe", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .post(`${baseUrl}/${responseAllRecipes.body[0].id}/imagesrecipes`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedImagesRecipesRequest);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
    });

    test("POST /recipes/:id/imagesrecipes - Should not be able to add image on recipe without authorization", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .post(`${baseUrl}/${responseAllRecipes.body[0].id}/imagesrecipes`)
            .send(mockedImagesRecipesRequest);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    test("POST /recipes/:id/imagesrecipes - Should not be able to add image on recipe with invalid id", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const response = await request(app)
            .post(
                `${baseUrl}/324dab7d-aac1-4b90-b962-298bb6e95a91/imagesrecipes`
            )
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedImagesRecipesRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});
