import { iUserLogin, iUserRequest, iUserResponse } from "../../../interfaces/users";

const mockedUserRequest: iUserRequest = {
    name: "Irineu",
    email: "irineu@mail.com",
    password: "irineu123",
    imageProfile: "fingeQueEumLink"
}

const mockedAdminUserRequest: iUserRequest = {
    name: "Admin",
    email: "admin@mail.com",
    password: "admin123",
    imageProfile: "http:/imglink"
}

const mockedAdminLoginRequest: iUserLogin = {
    email: "admin@mail.com",
    password: "admin123"
}


const mockedUserLoginRequest: iUserLogin = {
    email: "irineu@mail.com",
    password: "irineu123"
}

export {
    mockedUserRequest,
    mockedUserLoginRequest,
    mockedAdminUserRequest,
    mockedAdminLoginRequest
}