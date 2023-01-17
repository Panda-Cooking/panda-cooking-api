import { iUserLogin, iUserRequest, iUserUpdate, iUserBadUpdate } from "../../../interfaces/users";

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

const mockedUserPatchRequest: iUserUpdate = {
    name: "manuel gomes"
}

const mockedUserPatchBadRequest: iUserBadUpdate = {
    name: "toguro",
    isAdm: true
}

export {
    mockedUserRequest,
    mockedUserLoginRequest,
    mockedUserPatchRequest,
    mockedUserPatchBadRequest
}