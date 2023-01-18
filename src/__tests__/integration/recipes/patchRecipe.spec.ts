import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { DataSource } from "typeorm";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import {
    mockedRecipeRequest,
    mockedRecipeUpdateRequest,
} from "../../mocks/recipes";
import { Category } from "../../../entities/categories.entity";

describe("Update recipe route tests", () => {
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

    test("PATCH /recipes/:id - Should be able to update recipe", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .patch(`${baseUrl}/${responseAllRecipes.body[0].id}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeUpdateRequest);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("time");
        expect(response.body).toHaveProperty("portions");
        expect(response.body).toHaveProperty("category");
    });

    test("PATCH /recipes/:id - Should not be able to update recipe without authorizaton", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .patch(`${baseUrl}/${responseAllRecipes.body[0].id}`)
            .send(mockedRecipeUpdateRequest);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    test("PATCH /recipes/:id - Should not be able to update recipe with invalid id", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const response = await request(app)
            .patch(`${baseUrl}/324dab7d-aac1-4b90-b962-298bb6e95a91`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeUpdateRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});
