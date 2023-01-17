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
import { mockedRecipeRequest } from "../../mocks/recipes";
import { Category } from "../../../entities/categories.entity";
import { array } from "yup";

describe("Comments routes test", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });

        const usersRepo = AppDataSource.getRepository(User);
        const categoryRepo = AppDataSource.getRepository(Category);
        await categoryRepo.save({
            name: "lanches",
        });

        await request(app).post("/users").send(mockedUserRequest);
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const adminUser = await request(app)
            .post("/users")
            .send(mockedAdminUserRequest);

        await usersRepo.update({ id: adminUser.body.id }, { isAdm: true });

        await request(app)
            .post("/recipes")
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(mockedRecipeRequest);
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

    test("DELETE /comments/:id - Should be able to delete a comment", async () => {
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);
        const commentToBeDeleted = await request(app)
            .get("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        const response = await request(app)
            .delete(`/comments/${commentToBeDeleted.body[0].id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(204);
    });

    test("DELETE /comments/:id - Shouldn't be able to delete another user comment", async () => {
        const recipes = await request(app).get("/recipes");

        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);
        const adminLoginResponse = await request(app)
            .post("/auth")
            .send(mockedAdminLoginRequest);

        const user = await request(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        mockedAdminCommentCreation.userId = user.body.id;
        mockedAdminCommentCreation.recipeId = recipes.body[0].id;

        const commentToBeDeleted = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mockedAdminCommentCreation);

        const response = await request(app)
            .delete(`/comments/${commentToBeDeleted.body.id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403);
    });

    test("DELETE /comments/:id - Shouldn't be able to delete a comment without authentication", async () => {
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);
        const commentToBeDeleted = await request(app)
            .get("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        const response = await request(app).delete(
            `/comments/${commentToBeDeleted.body[0].id}`
        );

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("DELETE /comments/:id - Admin should be able to delete any comment", async () => {
        const adminLoginResponse = await request(app)
            .post("/auth")
            .send(mockedAdminLoginRequest);

        const user = await request(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const commentList = (
            await request(app)
                .get("/comments")
                .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        ).body.filter((comment) => comment.id !== user.body.id);

        const commentToBeDeleted = commentList[0];

        const response = await request(app)
            .delete(`/comments/${commentToBeDeleted.id}`)
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(204);
    });

    test("DELETE /comments/:id - Shouldn't be able to delete a comment with invalid id", async () => {
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const response = await request(app)
            .delete(`/comments/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("PATCH /recipes/:recipeId/comments/:commentId -  should be able to update comment", async () => {
        const newValues = { description: "comentario modificado" };

        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const token = `Bearer ${loginResponse.body.token}`;
        const recipes = await request(app).get("/recipes");
        const user = await request(app)
            .get("/users/profile")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        mockedCommentCreation.userId = user.body.id;
        mockedCommentCreation.recipeId = recipes.body[0].id;

        await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(mockedCommentCreation);

        const commentTobeUpdateRequest = await request(app).get("/comments");

        const commentTobeUpdateId = commentTobeUpdateRequest.body[0].id;

        const recipeTobeUpdateRequest = await request(app)
            .get("/recipes")
            .set("Authorization", token);
        const recipeTobeUpdateId = recipeTobeUpdateRequest.body[0].id;

        const response = await request(app)
            .patch(
                `/recipes/${recipeTobeUpdateId}/comments/${commentTobeUpdateId}`
            )
            .set("Authorization", token)
            .send(newValues);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("updatedAt");

        expect(response.body).toHaveProperty("user");
        expect(response.body.user).not.toHaveProperty("password");
        expect(response.body.user).toHaveProperty("isAdm");
        expect(response.body.user).toHaveProperty("imageProfile");
        expect(response.body.user).toHaveProperty("email");
        expect(response.body.user).toHaveProperty("name");
        expect(response.body.user).toHaveProperty("id");

        expect(response.body).toHaveProperty("recipe");
        expect(response.body.recipe).toHaveProperty("id");
        expect(response.body.recipe).toHaveProperty("name");
        expect(response.body.recipe).toHaveProperty("description");
        expect(response.body.recipe).toHaveProperty("time");
        expect(response.body.recipe).toHaveProperty("portions");
    });

    test("PATCH /recipes/:recipeId/comments/:commentId - should not be able to update a comment with invalid recipeId", async () => {
        const newValues = { description: "testando edição" };
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const commentTobeUpdateRequest = await request(app).get("/comments");

        const commentTobeUpdateId = commentTobeUpdateRequest.body[0].id;

        const response = await request(app)
            .patch(
                `/recipes/f516d9de-d4e5-406e-878e-392eef2649eb/comments/${commentTobeUpdateId}`
            )
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(newValues);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("PATCH /recipes/:id/comments/:commentId - should not be able to update a comment with invalid commentId", async () => {
        const newValues = { description: "testando edição" };
        const loginResponse = await request(app)
            .post("/auth")
            .send(mockedUserLoginRequest);

        const recipeTobeUpdateRequest = await request(app)
            .get("/recipes")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        const recipeTobeUpdateId = recipeTobeUpdateRequest.body[0].id;

        const response = await request(app)
            .patch(
                `/recipes/${recipeTobeUpdateId}/comments/f516d9de-d4e5-406e-878e-392eef2649eb`
            )
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(newValues);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(404);
    });

    test("PATCH /recipes/:recipeId/comments/:commentId - should not be able to update other users comment", async () =>{
        const newValues = { description: "testando edição 3" };
        const recipes = await request(app).get("/recipes");
        const adminLoginResponse = await request(app)
        .post("/auth")
        .send(mockedAdminLoginRequest);
    
        const admin = await request(app)
        .get("/users/profile")
        .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    
        mockedAdminCommentCreation.userId = admin.body.id;
        mockedAdminCommentCreation.recipeId = recipes.body[0].id;
    
        await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        .send(mockedAdminCommentCreation);
        
        const loginResponse = await request(app)
        .post("/auth")
        .send(mockedUserLoginRequest);

        const user = await request(app)
        .get("/users/profile")
        .set("Authorization", `Bearer ${loginResponse.body.token}`);
        const commentTobeUpdateRequest = (await request(app).get("/comments")).body.filter((comment) => comment.user.id !== user.body.id);

        console.log(user.body)
        console.log(commentTobeUpdateRequest)

        const commentTobeUpdateId = commentTobeUpdateRequest[0].id;

        const recipeTobeUpdateRequest = await request(app)
            .get("/recipes")
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        const recipeTobeUpdateId = recipeTobeUpdateRequest.body[0].id;

        const response = await request(app).patch(`/recipes/${recipeTobeUpdateId}/comments/${commentTobeUpdateId}`)
        .set("Authorization", `Bearer ${loginResponse.body.token}`)
        .send(newValues)

        console.log(response.body)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)

    })

    test("PATCH /recipes/:recipeId/comments/:commentId - Admin should be able to update other users comment", async () =>{
        const newValues = { description: "testando edição 2" };

        const adminLoginResponse = await request(app)
        .post("/auth")
        .send(mockedAdminLoginRequest);

        const commentTobeUpdateRequest = await request(app).get("/comments");

        const commentTobeUpdateId = commentTobeUpdateRequest.body[0].id;

        const recipeTobeUpdateRequest = await request(app)
            .get("/recipes")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

        const recipeTobeUpdateId = recipeTobeUpdateRequest.body[0].id;

        const response = await request(app).patch(`/recipes/${recipeTobeUpdateId}/comments/${commentTobeUpdateId}`)
        .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        .send(newValues)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("updatedAt");

        expect(response.body).toHaveProperty("user");
        expect(response.body.user).not.toHaveProperty("password");
        expect(response.body.user).toHaveProperty("isAdm");
        expect(response.body.user).toHaveProperty("imageProfile");
        expect(response.body.user).toHaveProperty("email");
        expect(response.body.user).toHaveProperty("name");
        expect(response.body.user).toHaveProperty("id");

        expect(response.body).toHaveProperty("recipe");
        expect(response.body.recipe).toHaveProperty("id");
        expect(response.body.recipe).toHaveProperty("name");
        expect(response.body.recipe).toHaveProperty("description");
        expect(response.body.recipe).toHaveProperty("time");
        expect(response.body.recipe).toHaveProperty("portions");
    })

    test("GET /comments - should be able to list all comments", async () =>{
        const response = await request(app).get("/comments")

        expect(response.status).toBe(200)
    })
});
