import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import { mockedRecipeRequest } from "../../mocks/recipes";
import { Category } from "../../../entities/categories.entity";

describe("Create recipe route tests", () => {
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

    test("POST /recipes - Should be able to create recipe", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const response = await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("category");
        expect(response.body).toHaveProperty("time");
        expect(response.body).toHaveProperty("portions");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("imagesRecipes");
        expect(response.body).toHaveProperty("ingredients");
        expect(response.body).toHaveProperty("preparations");
    });

    test("POST /recipes - Cannot create recipe without category", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const { category, ...recipeWithoutCategory } = mockedRecipeRequest;

        const response = await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(recipeWithoutCategory);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    });
});
