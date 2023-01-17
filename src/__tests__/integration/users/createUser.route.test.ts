import request from "supertest";
import { DataSource, Repository } from "typeorm";
import app from "../../../app";
import { User } from "../../../entities/users.entity";
import AppDataSource from "../../../data-source";
import { mockedUserRequest, mockedUserLoginRequest, mockedUserPatchRequest, mockedUserPatchBadRequest } from "../../mocks/users/user.mock";

describe("Create user route tests", () => {
    let conn: DataSource;
    const baseUrl: string = "/users";
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    let userId: string = "";

    beforeAll(async () => {
        await AppDataSource.initialize()
          .then((res) => (conn = res))
          .catch((err) => console.error(err));
      });
    
    afterAll(async () => {
        await conn.destroy();
    });

    test("POST /users - Should be able to create user", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserRequest)

        userId = response.body.id
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("imageProfile")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Irineu")
        expect(response.body.email).toEqual("irineu@mail.com")
        expect(response.body.imageProfile).toEqual("fingeQueEumLink")
        expect(response.body.isAdm).toEqual(false)
        expect(response.status).toBe(201)     
    })

    test("POST /users -  should not be able to create a user that already exists", async () => {
        const response = await request(app).post("/users").send(mockedUserRequest)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    test("GET /users/profile - should list user own profile", async () => {
        const getToken = await request(app).post("/auth").send(mockedUserLoginRequest);
        const token = getToken.body.token;

        const response = await request(app).get(`${baseUrl}/profile`).set("Authorization", `Bearer ${token}`);

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("imageProfile")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("Irineu")
        expect(response.body.email).toEqual("irineu@mail.com")
        expect(response.body.imageProfile).toEqual("fingeQueEumLink")
        expect(response.body.isAdm).toEqual(false)
        expect(response.status).toBe(200)
    })

    test("GET /users/profile - should not be able to list users without authentication", async () => {
        const response = await request(app).get(`${baseUrl}/profile`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)    
    })

    test("PATCH /users/profile - should not be able to update user profile without authentication", async () => {
        const response = await request(app).patch(`${baseUrl}/profile`).send(mockedUserPatchRequest);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("PATCH /users/profile - should be able to update user own profile with new data", async () => {
        const getToken = await request(app).post("/auth").send(mockedUserLoginRequest);
        const token = getToken.body.token;

        const response = await request(app).patch(`${baseUrl}/profile`).send(mockedUserPatchRequest).set("Authorization", `Bearer ${token}`);

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("imageProfile")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body.name).toEqual("manuel gomes")
        expect(response.status).toBe(200)
    })

    test("PATCH /users/profile - should not be able to update user own profile with unauthorized data", async () => {
        const getToken = await request(app).post("/auth").send(mockedUserLoginRequest);
        const token = getToken.body.token;

        const response = await request(app).patch(`${baseUrl}/profile`).send(mockedUserPatchBadRequest).set("Authorization", `Bearer ${token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("DELETE /users - should be able to delete user own profile", async () => {
        const getToken = await request(app).post("/auth").send(mockedUserLoginRequest);
        const token = getToken.body.token;

        const response = await request(app).delete(`${baseUrl}/profile`).send({userId: userId}).set("Authorization", `Bearer ${token}`);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(200)    
    })
})