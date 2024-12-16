import { IBuilder } from "@Domain/interfaces/builder.interface";
import { BranchModel } from "../branch.model";

export class BranchBuilder implements IBuilder<BranchModel> {
    private branch: BranchModel;

    constructor() {
        this.reset();
    }

    setId(id: number) {
        this.branch.id = id;
        return this;
    }
    setState(state: string) {
        this.branch.state = state;
        return this;
    }
    setName(name: string) {
        this.branch.name = name;
        return this;
    }
    setAddress(address: string) {
        this.branch.address = address;
        return this;
    }
    setEarnings(earnings: number) {
        this.branch.earnings = earnings;
        return this;
    }
    setCreated(created: Date) {
        this.branch.created = created;
        return this;
    }
    setModified(modified: Date) {
        this.branch.modified = modified;
        return this;
    }
    build(): BranchModel {
        const builded = this.branch;
        this.reset();
        return builded;
    }
    reset(): void {
        this.branch = new BranchModel();
    }
}