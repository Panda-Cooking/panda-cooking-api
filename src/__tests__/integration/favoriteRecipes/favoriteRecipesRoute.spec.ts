import request from "supertest";
import { DataSource } from "typeorm"
import app from "../../../app";
import AppDataSource from "../../../data-source"
import { Category } from "../../../entities/categories.entity"
import { mockedRecipeRequest } from "../../mocks/recipes";
import { mockedUserLoginRequest, mockedUserRequest } from "../../mocks/users/user.mock"



describe("Favorite recipes route test", () =>{
    let connection: DataSource

    beforeAll(async () =>{
        await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) =>{
            console.error("Error during Data Source initialization", err);
        });
        const categoryRepo = AppDataSource.getRepository(Category);
        await categoryRepo.save({
            name: "lanches",
        });

        await request(app).post("/users").send(mockedUserRequest);
        const loginResponse = await request(app)
        .post("/auth")
        .send(mockedUserLoginRequest);

        await request(app)
        .post("/recipes")
        .set("Authorization", `Bearer ${loginResponse.body.token}`)
        .send(mockedRecipeRequest);
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("POST /favoriterecipes/:id - Should be able to add a favorite recipe", async () =>{
        const recipes = await request(app).get("/recipes");

        const loginResponse = await request(app)
        .post("/auth")
        .send(mockedUserLoginRequest);


        const response = await request(app).post(`/favoriterecipes/${recipes.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(201)
    })

    test("POST /favoriterecipes/:id - Shouldn't be able to add a favorite recipe without authentication", async () =>{
        const recipes = await request(app).get("/recipes");

        const response = await request(app).post(`/favoriterecipes/${recipes.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("POST /favoriterecipes/:id - Shouldn't be able to add a favorite recipe with invalid recipeId", async  () => {
        const loginResponse = await request(app)
        .post("/auth")
        .send(mockedUserLoginRequest);

        const response = await request(app).post(`/favoriterecipes/711d91f1-89b7-478c-815e-144128f601e2`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    test("POST /favoriterecipes/:id - Shouldn't be able to add a recipe that is already a favorite", async () =>{
        const recipes = await request(app).get("/recipes");

        const loginResponse = await request(app)
        .post("/auth")
        .send(mockedUserLoginRequest);


        const response = await request(app).post(`/favoriterecipes/${recipes.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

})