import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
    mockedAdminCommentCreation,
    mockedCommentCreation,
    mockedCommentCreationInvalidRecipeId,
    mockedCommentCreationInvalidUserId,
} from "../../mocks/comments/comment.mock";
import {
    mockedAdminLoginRequest,
    mockedAdminUserRequest,
    mockedUserLoginRequest,
    mockedUserRequest,
} from "../../mocks/users/user.mock";
import { User } from "../../../entities/users.entity";

describe("Comments routes test", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });

        const usersRepo = AppDataSource.getRepository(User);

        await request(app).post("/users").send(mockedUserRequest);

        const adminUser = await request(app)
            .post("/users")
            .send(mockedAdminUserRequest);
        await usersRepo.update({ id: adminUser.body.id }, { isAdm: true });

        await request(app).post("/recipes").send(); // NECESSÁRIO RECEITA
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /comments - Should be able to create a new comment", async () => {
        const recipes = await request(app).get("/recipes");
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const user = await request(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        mockedCommentCreation.userId = user.body.id;
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

    test("POST /comments - Should not be able to create a comment without authentication", async () => {
        const recipes = await request(app).get("/recipes");

        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const user = await request(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        mockedCommentCreation.userId = user.body.id;
        mockedCommentCreation.recipeId = recipes.body[0].id;

        const response = await request(app)
            .post("/comments")
            .send(mockedCommentCreation);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

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

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("POST /comments - Should not be able to create a comment with invalid recipeId", async () => {
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const user = await request(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        mockedCommentCreation.userId = user.body.id;
        const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(mockedCommentCreationInvalidRecipeId);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("DELETE /comments/:id - Should be able to delete a comment", async () =>{
        const loginResponse = await request(app).post("/auth").send(mockedUserLoginRequest)
        const commentToBeDeleted = await request(app).get('/comments').set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/comments/${commentToBeDeleted.body[0].id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.status).toBe(204)
    })

    test("DELETE /comments/:id - Shouldn't be able to delete another user comment", async () =>{
        const recipes = await request(app).get("/recipes");

        const loginResponse = await request(app).post("/auth").send(mockedUserLoginRequest)
        const adminLoginResponse = await request(app).post("/auth").send(mockedAdminLoginRequest)

        const user = await request(app)
        .get("/users/profile")
        .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);


        mockedAdminCommentCreation.userId = user.body.id
        mockedAdminCommentCreation.recipeId = recipes.body[0].id

        const commentToBeDeleted = await request(app).post("/comments").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/comments/${commentToBeDeleted.body.id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    test("DELETE /comments/:id - Admin should be able to delete any comment", async () =>{
        const adminLoginResponse = await request(app).post("/auth").send(mockedAdminLoginRequest)

        const user = await request(app)
        .get("/users/profile")
        .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const commentList = (await request(app).get('/comments').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)).body.filter(comment => comment.id !== user.body.id)

        const commentToBeDeleted = commentList[0]
        
        const response = await request(app).delete(`/comments/${commentToBeDeleted.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(204)
    })

    test("DELETE /comments/:id - Shouldn't be able to delete a comment with invalid id", async () =>{
        const loginResponse = await request(app).post("/auth").send(mockedUserLoginRequest)

        const response = await request(app).delete(`/comments/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${loginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

});
