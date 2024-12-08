import { UserModelView } from "@Application/model-view/user.mv";
import { UserModel } from "@Domain/models/user.model";
import { TokenResponse } from "@Domain/types/token-response.type";
import { Request } from "express";

export interface AuthControllerPort {
    authenticate(req: Request): Promise<TokenResponse>;
    createUser(newUser: UserModel): Promise<UserModelView>
}