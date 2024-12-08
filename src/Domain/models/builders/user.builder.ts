import { IBuilder } from "@Domain/interfaces/builder.interface";
import { UserModel } from "../user.model";

export class UserBuilder implements IBuilder<UserModel> {
    private user: UserModel;

    constructor() {
        this.reset();
    }
    reset(): void {
        this.user = new UserModel;
    }
    build() {
        const builded = this.user;
        this.reset();
        return builded;
    }
    setId(id: number) {
        this.user.id = id;
        return this;
    }
    setEmail(email: string) {
        this.user.email = email;
        return this;
    }
    setPassword(password: string) {
        this.user.password = password;
        return this;
    }
    setState(state: string) {
        this.user.state = state;
        return this;
    }
    setCreated(created: Date) {
        this.user.created = created;
        return this;
    }
}