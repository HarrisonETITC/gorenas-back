import { UserModel } from "@Domain/models/user.model";

export interface UsersPort {
    findByEmail(email: string): Promise<UserModel>;
}