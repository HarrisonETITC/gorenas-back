import { UserModelView } from "@Application/model-view/user.mv";
import { UserModel } from "@Domain/models/user.model";

export interface AuthServicePort {
    generateToken(user: UserModelView): Promise<string>;
    parseFromToken(token: string): Promise<UserModel>;
}