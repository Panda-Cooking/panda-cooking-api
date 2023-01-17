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

describe("Delete recipes route tests", () => {
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

    test("DELETE /recipes/:id - Should be able to delete recipe", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .delete(`${baseUrl}/${responseAllRecipes.body[0].id}`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send();

        expect(response.status).toBe(204);
    });

    test("DELETE /recipes/:id - Should not be able to delete recipe without authorization", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const responseAllRecipes = await request(app).get(baseUrl).send();

        const response = await request(app)
            .delete(`${baseUrl}/${responseAllRecipes.body[0].id}`)
            .send();

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /recipes/:id - Should not be able to delete recipe with invalid id", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const response = await request(app)
            .delete(`${baseUrl}/324dab7d-aac1-4b90-b962-298bb6e95a91`)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send();

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });
});
