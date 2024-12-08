import { IBuilder } from "@Domain/interfaces/builder.interface";
import { RoleModel } from "../role.model";

export class RoleBuilder implements IBuilder<RoleModel> {
    private rol: RoleModel

    constructor() {
        this.reset();
    }

    setId(id: number) {
        this.rol.id = id;
        return this;
    }
    setName(name: string) {
        this.rol.name = name;
        return this;
    }
    setState(state: string) {
        this.rol.state = state;
        return this;
    }
    setCreated(created: Date) {
        this.rol.created = created;
        return this;
    }
    setModified(modified: Date) {
        this.rol.modified = modified;
        return this;
    }
    build(): RoleModel {
        const builded = this.rol;
        this.reset();
        return builded;
    }
    reset(): void {
        this.rol = new RoleModel();
    }
}