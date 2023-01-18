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

describe("List all recipes route tests", () => {
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

    test("GET /recipes - Should be able to get all recipes", async () => {
        const userLogin = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        await request(app)
            .post(baseUrl)
            .set("Authorization", `Bearer ${userLogin.body.token}`)
            .send(mockedRecipeRequest);

        const response = await request(app).get(baseUrl).send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
});
