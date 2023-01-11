export interface IUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    isAdm: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
