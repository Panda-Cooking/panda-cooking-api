import { iUserLogin, iUserRequest, iUserResponse } from "../../../interfaces/users";

const mockedUserRequest: iUserRequest = {
    name: "Irineu",
    email: "irineu@mail.com",
    password: "irineu123",
    imageProfile: "fingeQueEumLink"
}

const mockedUserLoginRequest: iUserLogin = {
    email: "irineu@mail.com",
    password: "irineu123"
}

export {
    mockedUserRequest,
    mockedUserLoginRequest
}