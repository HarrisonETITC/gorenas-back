import { UserModelView } from "@Application/model-view/user.mv";

export interface AuthManagerPort {
    validate(username: string, password: string): Promise<UserModelView>;
}