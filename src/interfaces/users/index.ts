export interface iUser {
    id: string;
    name: string;
    email: string;
    isAdm: boolean;
    imageProfile: string;
}

export interface iUserRequest {
    name: string;
    email: string;
    password: string;
    imageProfile: string;
}

export interface iUserResponse {
    id: string;
    name?: string;
    email?: string;
    imageProfile?: string;
    isAdm: boolean;
}

export interface iUserLogin {
    email: string;
    password: string;
}

export interface iUserUpdate {
    name?: string;
    email?: string;
    password?: string;
    imageProfile?: string;
}
