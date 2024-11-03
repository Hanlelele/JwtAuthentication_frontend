export interface UserLogIn {
    email: string;
    password: string;
}

export interface UserLogInResponse {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
}

export interface UserSignup {
    username: string;
    email: string;
    password: string;
}
