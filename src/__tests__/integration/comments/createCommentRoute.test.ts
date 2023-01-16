import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import { mockedCommentCreation, mockedCommentCreationInvalidRecipeId, mockedCommentCreationInvalidUserId } from "../../mocks/comments/createComment.mock";
import {
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";

describe("Create comment route test", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });

        await request(app).post("/users").send(mockedUserRequest);
        await request(app)
            .post("/recipes")
            .send(); // NECESSÁRIO RECEITA
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /comments - Should be able to create a new comment", async () => {

        const recipes = await request(app).get("/recipes");
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const user = await request(app).get("/users/profile").set("Authorization", `Bearer ${loginResponse.body.token}`)
        
        mockedCommentCreation.userId = user.body.id
        mockedCommentCreation.recipeId = recipes.body[0].id;
        const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(mockedCommentCreation);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("recipe");
        expect(response.status).toBe(201);
    });

    test("POST /comments - Should not be able to create a comment without authentication", async () =>{

        const recipes = await request(app).get("/recipes");

        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const user = await request(app).get("/users/profile").set("Authorization", `Bearer ${loginResponse.body.token}`)
        
        mockedCommentCreation.userId = user.body.id
        mockedCommentCreation.recipeId = recipes.body[0].id;

        const response = await request(app)
            .post("/comments")
            .send(mockedCommentCreation);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("POST /comments - Should not be able to create a comment with invalid userId", async () => {
        const recipes = await request(app).get("/recipes");
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        mockedCommentCreation.recipeId = recipes.body[0].id;
        const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(mockedCommentCreationInvalidUserId);
        
            expect(response.body).toHaveProperty("message")
            expect(response.status).toBe(404)
    })

    test("POST /comments - Should not be able to create a comment with invalid recipeId", async () =>{
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const user = await request(app).get("/users/profile").set("Authorization", `Bearer ${loginResponse.body.token}`)

        mockedCommentCreation.userId = user.body.id
        const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(mockedCommentCreationInvalidRecipeId);

            expect(response.body).toHaveProperty("message")
            expect(response.status).toBe(404)
    })


});
