import { IBuilder } from "@Domain/interfaces/builder.interface";
import { RolModel } from "../rol.model";

export class RolBuilder implements IBuilder<RolModel> {
    private rol: RolModel

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
    build(): RolModel {
        const builded = this.rol;
        this.reset();
        return builded;
    }
    reset(): void {
        this.rol = new RolModel();
    }
}