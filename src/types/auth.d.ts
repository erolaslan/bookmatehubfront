export interface UserLogin {
    username: string;
    password: string;
}

export interface UserRegister extends UserLogin {}

export interface Book {
    id: number;
    title: string;
    author: string;
    userId: number;
    status: "Active" | "Passive" | "Deleted";
}
