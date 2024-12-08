import { UserModel } from "@Domain/models/user.model";

export interface AuthManagerPort {
    validate(username: string, password: string): Promise<UserModel>;
}