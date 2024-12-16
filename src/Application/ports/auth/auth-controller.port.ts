import { UserModelView } from "@Application/model-view/user.mv";
import { UserModel } from "@Domain/models/user.model";
import { AuthResponse } from "@Domain/types/auth-response.type";
import { TokenResponse } from "@Domain/types/token-response.type";
import { Request } from "express";

export interface AuthControllerPort {
    authenticate(req: Request): Promise<AuthResponse>;
    createUser(newUser: UserModel): Promise<UserModelView>
}