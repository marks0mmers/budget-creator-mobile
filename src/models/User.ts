export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
}

export interface LoginUser extends Pick<User, "username"> {
    password: string;
}
