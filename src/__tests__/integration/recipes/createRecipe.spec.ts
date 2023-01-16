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

        console.log(response.body);

        expect(response.status).toBe(201);
    });
});
