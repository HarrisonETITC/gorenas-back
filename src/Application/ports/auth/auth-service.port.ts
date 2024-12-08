import { UserModel } from "@Domain/models/user.model";

export interface AuthServicePort {
    generateToken(user: UserModel): Promise<string>;
    parseFromToken(token: string): Promise<UserModel>;
}