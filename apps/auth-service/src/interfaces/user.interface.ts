export interface IRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: IUserNonSensitive;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface IUserNonSensitive {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
