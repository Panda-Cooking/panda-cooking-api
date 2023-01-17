import request from "supertest";
import { DataSource } from "typeorm";
import { Category } from "../../../entities/categories.entity";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import { mockedRecipeRequest } from "../../mocks/recipes";

describe("List recipe by id route tests", () => {
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

    test("GET /recipes/:id - Should be able to get all recipes", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .get(`${baseUrl}/${responseAllRecipes.body[0].id}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("category");
        expect(response.body).toHaveProperty("time");
        expect(response.body).toHaveProperty("portions");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("imagesRecipes");
        expect(response.body).toHaveProperty("ingredientsRecipes");
        expect(response.body).toHaveProperty("preparations");
        expect(response.body).toHaveProperty("comments");
    });

    test("GET /recipes/:id - Should not be able to list with invalid id", async () => {
        const response = await request(app)
            .get(`${baseUrl}/324dab7d-aac1-4b90-b962-298bb6e95a91`)
            .send();

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});
